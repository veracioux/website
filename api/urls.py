"""API URLConf"""
from django.urls import re_path

from .views import about

urlpatterns = [
    re_path(r"^about/?$", about.info),
    re_path(r"^about/realname/?$", about.realname),
    re_path(r"^about/age/?$", about.age),
]
