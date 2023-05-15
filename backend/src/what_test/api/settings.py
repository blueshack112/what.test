"""
Django settings for Project (API).
"""

from __future__ import annotations

from what_test.settings_base import *
from datetime import timedelta

# Application definition
INSTALLED_APPS += [
    # third party
    "corsheaders",
    "rest_framework",
    "rest_framework.authtoken",
    "drf_yasg",
]

MIDDLEWARE.insert(0, "corsheaders.middleware.CorsMiddleware")

# django-rest-framework settings
# http://www.django-rest-framework.org/api-guide/settings/


REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": ("utils.drf.renderers.CamelCaseJSONRenderer",),
    "DEFAULT_PARSER_CLASSES": ("utils.drf.parsers.CamelCaseJSONParser",),
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    # "DEFAULT_VERSIONING_CLASS": "rest_framework.versioning.NamespaceVersioning",
    # "DEFAULT_VERSION": "v1",
    "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema",
}


# drf-yasg settings
# https://drf-yasg.readthedocs.io/en/stable/settings.html
SWAGGER_SETTINGS = {
    "USE_SESSION_AUTH": False,
    "PERSIST_AUTH": True,
    "REFETCH_SCHEMA_WITH_AUTH": True,
    "REFETCH_SCHEMA_ON_LOGOUT": True,
    "SECURITY_DEFINITIONS": {
        "Bearer": {
            "type": "apiKey",
            "description": "JWT",
            "name": "Authorization",
            "in": "header",
        },
    },
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(weeks=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(weeks=1),
    "UPDATE_LAST_LOGIN": True,
}

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True

CORS_ORIGIN_ALLOW_ALL = get_bool_env("DJANGO_CORS_ALLOW_ALL", False)
CORS_ALLOW_HEADERS = [
    "Content-Disposition-Filename",
    "*",
]
CORS_EXPOSE_HEADERS = [
    "Content-Disposition-Filename",
]

