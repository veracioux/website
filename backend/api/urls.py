"""api URL configuration"""
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from backend.api.testimonial.views import TestimonialViewSet

from .views import about, projects, scripts, shields

router = DefaultRouter()
router.register("projects", projects.ProjectViewSet)
router.register("testimonials", TestimonialViewSet)

urlpatterns = [
    re_path(r"^about/?$", about.info),
    re_path(r"^about/realname/?$", about.realname),
    re_path(r"^about/age/?$", about.age),
    re_path(r"^shields/age/?$", shields.age),
    re_path(r"s(cripts)?(/(?P<script>.*))?", scripts),
    path("", include(router.urls)),
]
