"""My personal info.

Views are implemented as public functions, whereas protected functions with
matching names return raw data. Naturally, the views use those functions to
generate the response data.
"""
from datetime import datetime

from rest_framework.response import Response
from rest_framework.decorators import api_view


def json_response(data_getter):
    """Decorator that turns a dict result into a JsonResponse."""

    @api_view(["GET"])
    def view(_):
        return Response(data_getter())

    return view


def text_response(data_getter):
    """Decorator that turns an arbitrary result into a textual HttpResponse."""

    @api_view(["GET"])
    def view(_):
        return Response(str(data_getter()))

    return view


class Data:
    """Raw data before being wrapped into a response."""

    @staticmethod
    def realname():
        """Real name."""
        return "Haris Gušić"

    @staticmethod
    def age():
        """My current age."""
        return int((datetime.now() - datetime(1999, 2, 18)).days / 365.25)

    @staticmethod
    def info():
        """All info combined."""
        return {
            "realname": Data.realname(),
            "age": Data.age(),
        }


# Views
info = json_response(Data.info)
realname = text_response(Data.realname)
age = text_response(Data.age)
