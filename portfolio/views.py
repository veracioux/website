"""Portfolio views."""
from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    """The landing page."""
    return render(request, "index.html")
