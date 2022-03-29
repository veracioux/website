"""Portfolio views."""
from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    """The landing page."""
    return render(request, "index.html")
