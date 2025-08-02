from django import forms
from .models import Issue, IssueImage

class IssueForm(forms.ModelForm):
    class Meta:
        model = Issue
        fields = ['title', 'description', 'category', 'latitude', 'longitude', 'is_anonymous']
        widgets = {
            'latitude': forms.HiddenInput(),
            'longitude': forms.HiddenInput(),
        }

class ImageForm(forms.ModelForm):
    image = forms.ImageField(label='Image', widget=forms.ClearableFileInput(attrs={'multiple': True}))

    class Meta:
        model = IssueImage
        fields = ['image']
