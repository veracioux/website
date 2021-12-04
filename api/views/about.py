"""My personal info.

Views are implemented as public functions, whereas protected functions with
matching names return raw data. Naturally, the views use those functions to
generate the response data.
"""
from datetime import datetime

from django.http import HttpResponse, JsonResponse


def json_response(data_getter):
    """Decorator that turns a dict result into a JsonResponse."""

    def view(_):
        return JsonResponse(data_getter())

    return view


def text_response(data_getter):
    """Decorator that turns an arbitrary result into a textual HttpResponse."""

    def view(_):
        return HttpResponse(str(data_getter()))

    return view


def _info():
    return {
        "realname": _realname(),
        "age": _age(),
    }


def _realname():
    return "Haris Gušić"


def _age():
    return int((datetime.now() - datetime(1999, 2, 18)).days / 365.25)


# Views
info = json_response(_info)
realname = text_response(_realname)
age = text_response(_age)
