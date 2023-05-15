"""
Django settings for Project (Admin).
"""

from __future__ import annotations

from what_test.settings_base import *


# Application definition

# noinspection PyUnboundLocalVariable,PyUnresolvedReferences
INSTALLED_APPS.insert(0, 'django.contrib.admin')
# noinspection PyUnresolvedReferences
INSTALLED_APPS += [
    'django.contrib.sessions',
    'django.contrib.messages',
]

# noinspection PyUnboundLocalVariable,PyUnresolvedReferences
MIDDLEWARE = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
] + MIDDLEWARE

TEMPLATES[0]['DIRS'] = [os.path.join(BASE_DIR, 'what_test/admin/templates')]


# SecurityMiddleware
# https://docs.djangoproject.com/en/1.11/ref/middleware/#django.middleware.security.SecurityMiddleware
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True


