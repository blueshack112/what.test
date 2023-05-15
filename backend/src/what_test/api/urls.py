# -*- coding: utf-8 -*-
"""
URL Configuration for API endpoints

"""

from __future__ import annotations
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
   openapi.Info(
      title="What Test",
      default_version='v1',
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

# noinspection PyUnresolvedReferences
urlpatterns = [
    path("", schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path("v1/", include("what_test.api.urls_v1")),
]
