from uuid import uuid4
from django.db import models


class Project(models.Model):
    slug = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    desc = models.TextField()
    url = models.URLField()
    repo_url = models.URLField(null=True)
    start_date = models.DateField(null=True)
    organization = models.CharField(max_length=50, null=True)
    organization_url = models.CharField(max_length=100, null=True)
    my_contributions_url = models.URLField(null=True)
    roles = models.JSONField(max_length=200, null=True)
    languages = models.JSONField(null=True)


class PublicKey(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    desc = models.TextField()


class GPGPublicKey(PublicKey):
    public_key = models.TextField()


def image_storage_path(_instance, _filename):
    return f"testimonials/images/{uuid4()}.png"


def gpg_key_storage_path(_instance, _filename):
    return f"testimonials/gpg-keys/{uuid4()}.asc"


class Testimonial(models.Model):
    #: First and last name of the testimonial giver
    giver_name = models.CharField(max_length=300)
    #: Optional image shown on the testimonial
    image = models.ImageField(upload_to=image_storage_path, null=True)
    email = models.EmailField(null=True)
    email_public = models.BooleanField(null=False)
    website = models.URLField(null=True)
    #: The testimonial text
    text = models.TextField(null=False)
    #: Signature under the testimonial
    friendly_signature = models.CharField(max_length=100, null=True)
    #: GPG public key
    gpg_public_key = models.FileField(upload_to=gpg_key_storage_path)
    #: Detached GPG signature of the testimonial text
    gpg_signature = models.TextField(null=False, default=str)
    #: Something that can be used to verify that the signing key is associated
    #: with the testimonial giver. Can be a URL to a keyserver.
    reference = models.TextField()
    is_verified = models.BooleanField(null=False, default=False)
