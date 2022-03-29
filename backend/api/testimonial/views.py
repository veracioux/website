from rest_framework import viewsets

from backend.api.testimonial.models import Testimonial
from backend.api.util import InlineSerializer


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = InlineSerializer(model=Testimonial)
    permission_classes = []
