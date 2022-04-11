"""backend URL configuration"""
from django.contrib import admin
from django.urls import include, path

from backend.portfolio import views as portfolio
from backend.views import dotfiles

urlpatterns = [
    path("", portfolio.index),
    path("admin/", admin.site.urls),
    path("api/", include("backend.api.urls")),
    path("dotfiles", dotfiles),
]
