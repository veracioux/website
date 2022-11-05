"""backend URL configuration"""
from django.contrib import admin
from django.http import HttpRequest, HttpResponse
from django.urls import include, path, re_path
from django.conf import settings

from backend.views import dotfiles


def echo(request: HttpRequest):
    """Echo back received request headers."""
    return HttpResponse(str(request.headers))


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("backend.api.urls")),
    path("dotfiles", dotfiles),
    # Utility endpoint for debugging request headers received from proxy
    re_path("^backend/echo/?$", echo),
]
