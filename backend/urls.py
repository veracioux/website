"""backend URL configuration"""
from django.contrib import admin
from django.http import HttpRequest, HttpResponse
from django.urls import include, path, re_path
from django.conf import settings

from backend.views import dotfiles


def echo(request: HttpRequest):
    """Echo back received request headers."""
    return HttpResponse(str(request.headers))


prefix = getattr(settings, "URL_PREFIX", "")

if prefix.startswith("/"):
    prefix = prefix[1:]
if prefix and not prefix.endswith("/"):
    prefix = prefix + "/"

urlpatterns = [
    path(f"{prefix}admin/", admin.site.urls),
    path(f"{prefix}api/", include("backend.api.urls")),
    path(f"{prefix}dotfiles", dotfiles),
    # Utility endpoint for debugging request headers received from proxy
    re_path(f"^{prefix}backend/echo/?$", echo),
]
