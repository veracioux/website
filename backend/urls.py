"""backend URL configuration"""
from django.conf import settings
from django.contrib import admin
from django.http import HttpRequest, HttpResponse
from django.urls import include, path, re_path

from backend.views import dotfiles


def echo(request: HttpRequest):
    """Echo back received request headers."""
    return HttpResponse(str(request.headers))


URL_PREFIX = getattr(settings, "URL_PREFIX", "")

urlpatterns = []

for prefix in (p for p in ["", URL_PREFIX or None] if p is not None):
    if prefix and not prefix.endswith("/"):
        prefix = f"{prefix}/"
    if prefix.startswith("/"):
        prefix = prefix[1:]
    urlpatterns += [
        path(f"{prefix}admin/", admin.site.urls),
        path(f"{prefix}api/", include("backend.api.urls")),
        path(f"{prefix}dotfiles", dotfiles),
        # Utility endpoint for debugging request headers received from proxy
        re_path(f"^{prefix}backend/echo/?$", echo),
    ]
