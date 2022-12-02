from types import SimpleNamespace

import requests
from django.http import HttpRequest, HttpResponse, JsonResponse


def derive_error_code(original_code):
    if original_code >= 500:
        return HttpResponse(status=502)
    return HttpResponse(status=404)


def scripts(request: HttpRequest, script: str = None) -> HttpResponse:
    resp = requests.get(
        "https://api.github.com/repos/veracioux/dotfiles/contents/.haris-bin"
    )
    if not (200 <= resp.status_code < 400):
        return derive_error_code(resp.status_code)

    files = [
        SimpleNamespace(name=f.get("name"), url=f.get("download_url"))
        for f in resp.json()
    ]
    filenames = [f.name for f in files]

    if not script:
        return JsonResponse(filenames, safe=False)
    if script not in filenames:
        return HttpResponse(status=404)

    url = next((f.url for f in files if f.name == script), None)
    resp = requests.get(url)
    print(url)
    if not (200 <= resp.status_code < 400):
        return derive_error_code(resp.status_code)

    return HttpResponse(resp.text)
