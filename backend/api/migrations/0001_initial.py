# Generated by Django 3.2.12 on 2022-03-27 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("slug", models.CharField(max_length=50)),
                ("title", models.CharField(max_length=50)),
                ("desc", models.TextField()),
                ("url", models.URLField()),
                ("repo_url", models.URLField(null=True)),
                ("start_date", models.DateField(null=True)),
                ("organization", models.CharField(max_length=50, null=True)),
                (
                    "organization_url",
                    models.CharField(max_length=100, null=True),
                ),
                ("my_contributions_url", models.URLField(null=True)),
                ("roles", models.JSONField(max_length=200, null=True)),
                ("languages", models.JSONField(null=True)),
            ],
        ),
    ]
