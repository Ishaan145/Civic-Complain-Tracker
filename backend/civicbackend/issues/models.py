from django.contrib.auth.models import User
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Issue(models.Model):
    STATUS_CHOICES = [
        ('Reported', 'Reported'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()
    reporter = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True) # For anonymous reporting
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Reported')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_anonymous = models.BooleanField(default=False)
    is_hidden = models.BooleanField(default=False) # For admin moderation

    def __str__(self):
        return self.title

class IssueImage(models.Model):
    issue = models.ForeignKey(Issue, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='issue_images/')

class Flag(models.Model):
    issue = models.ForeignKey(Issue, related_name='flags', on_delete=models.CASCADE)
    flagged_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('issue', 'flagged_by')
