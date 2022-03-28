"""Django settings for backend project."""

import os
from pathlib import Path

import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
os.environ["ENVIRONMENT"] = "dev"
environ.Env.read_env(BASE_DIR / ".env/common")
if env("ENVIRONMENT") == "production":
    environ.Env.read_env(BASE_DIR / ".env/production")
elif env("ENVIRONMENT") == "local":
    environ.Env.read_env(BASE_DIR / ".env/local")
    environ.Env.read_env(BASE_DIR / ".env/local.secret")
else:
    environ.Env.read_env(BASE_DIR / ".env/dev")

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

DEBUG = env("ENVIRONMENT") == "dev"

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    "backend.portfolio",
    "backend.api",
    "backend.api.testimonial",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "frontend/dist", BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Database

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": env("DB_NAME"),
        "USER": env("DB_USER"),
        "PASSWORD": env("DB_PASSWORD"),
        "HOST": env("DB_HOST"),
        "PORT": env("DB_PORT"),
    },
}

# Password validation

# pylint: disable=line-too-long

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# pylint: enable=line-too-long

# Internationalization

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join("/var/static_root/")
STATICFILES_DIRS = [os.path.join(BASE_DIR, "frontend/dist/static")]

# File storage
if env("ENVIRONMENT") != "dev":
    DEFAULT_FILE_STORAGE = "storages.backends.dropbox.DropBoxStorage"
    DROPBOX_ROOT_PATH = "/website"
    DROPBOX_OAUTH2_TOKEN = env("DROPBOX_OAUTH2_TOKEN")
MEDIA_ROOT = "/var/media"

# Default primary key field type

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
