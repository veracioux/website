# Generated by Django 3.2.12 on 2022-04-14 19:05

import backend.api.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=50)),
                ('title', models.CharField(max_length=50)),
                ('desc', models.TextField()),
                ('url', models.URLField()),
                ('repo_url', models.URLField(null=True)),
                ('start_date', models.DateField(null=True)),
                ('organization', models.CharField(max_length=50, null=True)),
                ('organization_url', models.CharField(max_length=100, null=True)),
                ('my_contributions_url', models.URLField(null=True)),
                ('roles', models.JSONField(max_length=200, null=True)),
                ('languages', models.JSONField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PublicKey',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.TextField()),
                ('desc', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Testimonial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('giver_name', models.CharField(max_length=300)),
                ('image', models.ImageField(null=True, upload_to=backend.api.models.image_storage_path)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('email_public', models.BooleanField()),
                ('website', models.URLField(null=True)),
                ('text', models.TextField()),
                ('friendly_signature', models.CharField(max_length=100, null=True)),
                ('gpg_public_key', models.FileField(upload_to=backend.api.models.gpg_key_storage_path)),
                ('gpg_signature', models.TextField(default=str)),
                ('reference', models.TextField()),
                ('is_verified', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='GPGPublicKey',
            fields=[
                ('publickey_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.publickey')),
                ('public_key', models.TextField()),
            ],
            bases=('api.publickey',),
        ),
    ]
