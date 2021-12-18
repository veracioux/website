from rest_framework.serializers import ModelSerializer

class InlineSerializer(ModelSerializer):
    def __new__(cls, *args, **kwargs):
        return type("InlineSerializer", (ModelSerializer,), {
            "Meta": type("Meta", (), {
                "fields": "__all__",
                "model": kwargs["model"],
            }),
        })