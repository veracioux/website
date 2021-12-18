"""API to generate content for shields.io badges."""
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .about import Data


@api_view(["GET"])
def age(_):
    """My current age."""
    return Response({
        "schemaVersion": 1,
        "message": str(Data.age()),
        "label": "version",
        "color": "#6980fa",
    })
