from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.serializers import ModelSerializer
from api.models import Project
from api.util import InlineSerializer


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = InlineSerializer(model=Project)
    permission_classes = []
