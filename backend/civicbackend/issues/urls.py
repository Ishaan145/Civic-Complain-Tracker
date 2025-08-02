# issues/urls.py

from django.urls import path
from . import views

urlpatterns = [
    # API endpoints
    path('api/register/', views.register_api, name='register_api'),
    path('api/login/', views.login_api, name='login_api'),
    path('api/logout/', views.logout_api, name='logout_api'),

    path('api/issues/', views.issue_list_api, name='issue_list_api'),
    path('api/issues/create/', views.create_issue_api, name='create_issue_api'),
    path('api/issues/<int:issue_id>/', views.issue_detail_api, name='issue_detail_api'),
    path('api/issues/<int:issue_id>/flag/', views.flag_issue_api, name='flag_issue_api'),
    
    path('api/categories/', views.category_list_api, name='category_list_api'),
]
