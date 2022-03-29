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
