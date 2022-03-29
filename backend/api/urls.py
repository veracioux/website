"""api URL configuration"""
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from .views import about, shields, projects
from backend.api.testimonial.views import TestimonialViewSet

router = DefaultRouter()
router.register("projects", projects.ProjectViewSet)
router.register("testimonials", TestimonialViewSet)

urlpatterns = [
    re_path(r"^about/?$", about.info),
    re_path(r"^about/realname/?$", about.realname),
    re_path(r"^about/age/?$", about.age),
    re_path(r"^shields/age/?$", shields.age),
    path('', include(router.urls)),
]
