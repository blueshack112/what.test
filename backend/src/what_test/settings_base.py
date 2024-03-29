"""
Django settings for Project.

Generated by 'django-admin startproject' using Django 4.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
import os
from pathlib import Path


def get_bool_env(key, default=None):
    value = os.environ.get(key, None)
    if value is None:
        return default
    if value.isdigit():
        return bool(int(value))
    return value.lower() == "true"


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-57)$=8mad_$%c^jokce2!*ecbaw&pkgqay0bx_9$5)m0#&)@s!"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = get_bool_env("DEBUG", True)
SERVICE_ID = os.environ.get("SERVICE_ID", "api")

# ALLOWED_HOSTS = (
#     None
#     if not os.environ.get("ALLOWED_HOSTS", None)
#     else os.environ["ALLOWED_HOSTS"].split(",")
# )
# # allow loopback interface and service domain by default
# if not ALLOWED_HOSTS:
ALLOWED_HOSTS = ["*"]

# Application definition

INSTALLED_APPS = [
    "accounts",
    "products",
    # Django
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.staticfiles",
    # Third-party
    "django_extensions",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "what_test.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
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

WSGI_APPLICATION = "what_test.wsgi.application"

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("POSTGRES_DB", "what-db"),
        "USER": os.environ.get("POSTGRES_USER", "what-user"),
        "PASSWORD": os.environ.get("POSTGRES_PASSWORD", "strong_password_123"),
        "HOST": os.environ.get("DJANGO_SETTINGS_POSTGRES_DB_HOST", "127.0.0.1"),
        "PORT": os.environ.get("DJANGO_SETTINGS_POSTGRES_DB_PORT", "5454"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

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

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/
STATIC_URL = "static/"

# files
# https://docs.djangoproject.com/en/1.11/topics/files/
# See django-storages section for MEDIA_URL and DEFAULT_FILE_STORAGE
# noinspection PyUnresolvedReferences
MEDIA_ROOT = os.environ.get(
    "MEDIA_ROOT", os.path.join(os.path.dirname(BASE_DIR), "data", "media")
)
# noinspection PyUnresolvedReferences
HOST_DATA_DIR_ABS_PATH = os.environ.get(
    "HOST_DATA_DIR_ABS_PATH", os.path.join(os.path.dirname(BASE_DIR), "data")
)
HOST_MEDIA_DIR_ABS_PATH = os.path.join(HOST_DATA_DIR_ABS_PATH, "media")

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# start shell plus with ipython by default
SHELL_PLUS = "ipython"
NOTEBOOK_ARGUMENTS = []

# Celery
CELERY_BROKER_URL = os.environ.get("CELERY_BROKER", "redis://redis_queue:6379/0")
CELERY_TASK_SOFT_TIME_LIMIT = int(
    os.environ.get("CELERY_TASK_SOFT_TIME_LIMIT", 60 * 30)
)
CELERY_TASK_TIME_LIMIT = int(os.environ.get("CELERY_TASK_TIME_LIMIT", 60 * 60))

# Queue
CELERY_TASK_DEFAULT_QUEUE = "what-test-default"

# Load admin app?
LOAD_ADMIN_APP = SERVICE_ID != "admin" and get_bool_env("LOAD_ADMIN_APP", False)

if LOAD_ADMIN_APP:
    from what_test.admin.settings import *
