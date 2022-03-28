from rest_framework import viewsets
from backend.api.models import Project
from backend.api.util import InlineSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = InlineSerializer(model=Project)
    permission_classes = []
