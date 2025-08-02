from django.contrib import admin
from .models import Category, Issue, IssueImage, Flag

class IssueImageInline(admin.TabularInline):
    model = IssueImage
    extra = 1

class IssueAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'created_at', 'is_hidden', 'flag_count')
    list_filter = ('status', 'category', 'is_hidden')
    search_fields = ('title', 'description')
    inlines = [IssueImageInline]
    actions = ['unhide_issues']

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.annotate(flag_count_annotation=Count('flags'))
        return queryset

    def flag_count(self, obj):
        return obj.flag_count_annotation
    flag_count.short_description = 'Flags'

    def unhide_issues(self, request, queryset):
        queryset.update(is_hidden=False)
    unhide_issues.short_description = "Unhide selected issues"

admin.site.register(Category)
admin.site.register(Issue, IssueAdmin)
admin.site.register(Flag)
