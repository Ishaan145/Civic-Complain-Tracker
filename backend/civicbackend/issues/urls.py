from django.urls import path
from . import views

urlpatterns = [
    path('', views.issue_list, name='issue_list'),
    path('issue/<int:issue_id>/', views.issue_detail, name='issue_detail'),
    path('issue/new/', views.create_issue, name='create_issue'),
    path('issue/<int:issue_id>/flag/', views.flag_issue, name='flag_issue'),
    path("register/", views.register_request, name="register"),
    path("login/", views.login_request, name="login"),
    path("logout/", views.logout_request, name="logout"),
]
