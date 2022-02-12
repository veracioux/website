from django.db import models

class Project(models.Model):
    slug = models.CharField(primary_key=True, max_length=50)
    title = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(auto_now_add=True)
    organization = models.CharField(max_length=50, null=True)
    my_contributions_url = models.CharField(max_length=300, null=True)
