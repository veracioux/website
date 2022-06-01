"""backend URL configuration"""
from django.contrib import admin
from django.urls import include, path

from backend.views import dotfiles

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("backend.api.urls")),
    path("dotfiles", dotfiles),
]
