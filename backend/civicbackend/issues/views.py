import json
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.db.models import F, ExpressionWrapper, FloatField, Func
from math import radians

from .models import Issue, Category, IssueImage, Flag

# --- Helper Functions ---

def serialize_issue(issue):
    reporter_username = 'Anonymous'
    if not issue.is_anonymous and issue.reporter:
        reporter_username = issue.reporter.username

    distance_in_km = getattr(issue, 'distance', None)

    return {
        'id': issue.id,
        'title': issue.title,
        'description': issue.description,
        'category': issue.category.name,
        'latitude': issue.latitude,
        'longitude': issue.longitude,
        'reporter': reporter_username,
        'status': issue.status,
        'created_at': issue.created_at.isoformat(),
        'updated_at': issue.updated_at.isoformat(),
        'is_anonymous': issue.is_anonymous,
        'images': [img.image.url for img in issue.images.all()],
        'flag_count': issue.flags.count(),
        #'history': [{'status': h.status, 'timestamp': h.timestamp.isoformat()} for h in issue.history.all()],
        'distance': distance_in_km,

    }

# --- Authentication API Views ---

@csrf_exempt
def register_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        if not all([username, password, email]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, password=password, email=email)
        return JsonResponse({'success': 'User created successfully'}, status=201)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def login_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({
                'success': 'Login successful',
                'user': {'id': user.id, 'username': user.username}
            })
        return JsonResponse({'error': 'Invalid credentials'}, status=401)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def logout_api(request):
    logout(request)
    return JsonResponse({'success': 'Logout successful'})


# --- Issue Management API Views ---
"""
def issue_list_api(request):
    user_lat = float(request.GET.get('lat', 0.0))
    user_lon = float(request.GET.get('lon', 0.0))

    # Haversine formula for distance calculation
    R = 6371  # Earth radius in km
    dlat = ExpressionWrapper(F('latitude') - user_lat, output_field=FloatField()) * (3.14159 / 180)
    dlon = ExpressionWrapper(F('longitude') - user_lon, output_field=FloatField()) * (3.14159 / 180)
    a = (Func(dlat / 2, function='sin') ** 2 +
         Func(radians(user_lat), function='cos') * Func(F('latitude') * (3.14159 / 180), function='cos') *
         Func(dlon / 2, function='sin') ** 2)
    c = 2 * Func(Func(a, function='sqrt'), Func(1 - a, function='sqrt'), function='atan2')
    distance = R * c

    issues = Issue.objects.filter(is_hidden=False).annotate(distance=distance).filter(distance__lte=5)

    # Filtering logic
    if status_filter := request.GET.get('status'):
        issues = issues.filter(status=status_filter)
    if category_filter := request.GET.get('category'):
        issues = issues.filter(category__name=category_filter)
    if distance_filter := request.GET.get('distance'):
        issues = issues.filter(distance__lte=int(distance_filter))

    data = [serialize_issue(issue) for issue in issues]
    return JsonResponse(data, safe=False)
"""

def issue_list_api(request):
    user_lat = float(request.GET.get('lat', 0.0))
    user_lon = float(request.GET.get('lon', 0.0))

    # Haversine formula for distance calculation
    R = 6371  # Earth radius in km
    dlat = ExpressionWrapper(F('latitude') - user_lat, output_field=FloatField()) * (3.14159 / 180)
    dlon = ExpressionWrapper(F('longitude') - user_lon, output_field=FloatField()) * (3.14159 / 180)

    # --- THIS IS THE CORRECTED PART ---
    a = (
        ExpressionWrapper(Func(dlat / 2, function='sin') ** 2, output_field=FloatField()) +
        ExpressionWrapper(Func(radians(user_lat), function='cos') * Func(F('latitude') * (3.14159 / 180), function='cos') * (Func(dlon / 2, function='sin') ** 2), output_field=FloatField())
    )
    # ------------------------------------

    c = 2 * Func(Func(a, function='sqrt'), Func(1 - a, function='sqrt'), function='atan2')
    distance = R * c

    issues = Issue.objects.filter(is_hidden=False).annotate(distance=distance).filter(distance__lte=5)

    # Filtering logic
    if status_filter := request.GET.get('status'):
        issues = issues.filter(status=status_filter)
    if category_filter := request.GET.get('category'):
        issues = issues.filter(category__name=category_filter)
    if distance_filter := request.GET.get('distance'):
        issues = issues.filter(distance__lte=int(distance_filter))

    data = [serialize_issue(issue) for issue in issues]
    return JsonResponse(data, safe=False)

def issue_detail_api(request, issue_id):
    issue = get_object_or_404(Issue.objects.prefetch_related('images', 'flags'), id=issue_id)
    return JsonResponse(serialize_issue(issue))

"""
@csrf_exempt
def create_issue_api(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)

    if request.method == 'POST':
        # Create a new issue instance
        issue = Issue.objects.create(
            title=request.POST.get('title'),
            description=request.POST.get('description'),
            category=get_object_or_404(Category, id=request.POST.get('category')),
            latitude=request.POST.get('latitude'),
            longitude=request.POST.get('longitude'),
            reporter=request.user if request.POST.get('is_anonymous') == 'false' else None,
            is_anonymous=request.POST.get('is_anonymous') == 'true'
        )

        # Handle image uploads
        for file in request.FILES.getlist('images'):
            IssueImage.objects.create(issue=issue, image=file)

        return JsonResponse(serialize_issue(issue), status=201)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
"""

# issues/views.py
"""
# @csrf_exempt
def create_issue_api(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)

    if request.method == 'POST':
        try:
            # --- NEW: Wrapped logic in a try...except block ---
            issue = Issue.objects.create(
                title=request.POST.get('title'),
                description=request.POST.get('description'),
                category=get_object_or_404(Category, id=request.POST.get('category')),
                latitude=request.POST.get('latitude'),
                longitude=request.POST.get('longitude'),
                reporter=request.user if request.POST.get('is_anonymous') == 'false' else None,
                is_anonymous=request.POST.get('is_anonymous') == 'true'
            )

            for file in request.FILES.getlist('images'):
                IssueImage.objects.create(issue=issue, image=file)

            return JsonResponse(serialize_issue(issue), status=201)
        except Exception as e:
            # Return a specific error if something goes wrong during creation
            return JsonResponse({'error': f'Invalid data provided. {str(e)}'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
"""

# @csrf_exempt
def create_issue_api(request):
    # 1. Check if the user is logged in
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)

    # 2. Ensure the request is a POST request
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method. Please use POST.'}, status=405)

    # 3. Use a try...except block to catch any errors during creation
    try:
        # Get the category object, or return a 404 if it doesn't exist
        category_id = request.POST.get('category')
        category = get_object_or_404(Category, id=category_id)

        # Create the new Issue object
        issue = Issue.objects.create(
            title=request.POST.get('title'),
            description=request.POST.get('description'),
            category=category,
            latitude=request.POST.get('latitude'),
            longitude=request.POST.get('longitude'),
            reporter=request.user if request.POST.get('is_anonymous') == 'false' else None,
            is_anonymous=request.POST.get('is_anonymous') == 'true'
        )

        # Handle any uploaded images
        for file in request.FILES.getlist('images'):
            IssueImage.objects.create(issue=issue, image=file)
        
        # On success, return the new issue data as JSON
        return JsonResponse(serialize_issue(issue), status=201)

    except Exception as e:
        # If any error occurs above, catch it and return a clean JSON error message
        return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=400)


@csrf_exempt
def flag_issue_api(request, issue_id):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)

    if request.method == 'POST':
        issue = get_object_or_404(Issue, id=issue_id)
        flag, created = Flag.objects.get_or_create(issue=issue, flagged_by=request.user)

        if created:
            # Auto-hide if flag threshold is met
            if issue.flags.count() >= 3:
                issue.is_hidden = True
                issue.save()
            return JsonResponse({'success': 'Issue flagged'}, status=201)
        return JsonResponse({'message': 'You have already flagged this issue'}, status=200)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


def category_list_api(request):
    categories = Category.objects.all()
    data = [{'id': cat.id, 'name': cat.name} for cat in categories]
    return JsonResponse(data, safe=False)
