"""Top-level utility endpoints."""
import functools
import json
import os
import subprocess as sp
import sys
import tempfile

import requests
from django.http import HttpRequest, HttpResponse, StreamingHttpResponse
from django.http.response import HttpResponseBase
from rest_framework.decorators import api_view


@api_view(["GET"])
def dotfiles(request: HttpRequest) -> HttpResponseBase:
    """Return a link to download dotfiles generated using org tangle."""
    ref = request.GET.get("ref") or "master"

    resp = requests.get(
        f"http://{os.environ.get('WORKER_HOST')}/dotfiles?ref={ref}",
        stream=True
    )

    return StreamingHttpResponse(
        resp.raw,
        content_type=resp.headers.get("content-type"),
        status=resp.status_code,
        reason=resp.reason,
    )
