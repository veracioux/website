from rest_framework.viewsets import ModelViewSet

from api.models import Testimonial
from api.util import InlineSerializer


class TestimonialViewSet(ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = InlineSerializer(model=Testimonial)
    permission_classes = []
