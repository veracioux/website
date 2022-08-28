"""backend URL configuration"""
import os

from django.contrib import admin
from django.http import HttpRequest, HttpResponse
from django.urls import include, path, re_path

from backend.views import dotfiles


def echo(request: HttpRequest):
    """Echo back received request headers."""
    return HttpResponse(str(request.headers))


urlpatterns = []

prefixes = (["stg/"] if os.environ.get("ENVIRONMENT") == "staging" else []) + [
    ""
]

# NOTE: REST framework router uses the most recent URL registered in the
# urlpatterns list. On an actual host server, we want the URLs to be prefixed
# with /stg, but on a development server we want no prefix (so we don't have
# to use staging auth to explore and make requests to the API).
if os.environ.get("MACHINE") == "public":
    prefixes = reversed(prefixes)

for prefix in prefixes:
    urlpatterns += [
        path(f"{prefix}admin/", admin.site.urls),
        path(f"{prefix}api/", include("backend.api.urls")),
        path(f"{prefix}dotfiles", dotfiles),
        # Utility endpoint for debugging request headers received from proxy
        re_path(f"^{prefix}backend/echo/?$", echo),
    ]
