from rest_framework.viewsets import ModelViewSet

from backend.api.models import Testimonial
from backend.api.util import InlineSerializer


class TestimonialViewSet(ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = InlineSerializer(model=Testimonial)
    permission_classes = []
