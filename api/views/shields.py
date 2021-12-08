"""API to generate content for shields.io badges."""
from django.http import JsonResponse
from .about import Data


def age(_):
    """My current age."""
    return JsonResponse({
        "schemaVersion": 1,
        "message": str(Data.age()),
        "label": "version",
        "color": "#6980fa",
    })
