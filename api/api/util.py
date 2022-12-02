from rest_framework.serializers import ModelSerializer


class InlineSerializer(ModelSerializer):
    """Declare a serializer without writing a full-fledged class."""

    _cache = {}

    def __new__(cls, model=None, fields=None, exclude=None, **kwargs):
        if model in cls._cache:
            return cls._cache[model]
        dct = {
            "model": model,
        }
        if fields is not None:
            dct["fields"] = fields
        if exclude is not None:
            dct["exclude"] = exclude
        if fields is None and exclude is None:
            dct["fields"] = "__all__"

        cls._cache[model] = type(
            "InlineSerializer",
            (ModelSerializer,),
            {
                "Meta": type("Meta", (), dct),
            },
        )
        return cls._cache[model]
