# -*- coding: utf-8 -*-
"""
URL Configuration for admin app

"""
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('', admin.site.urls),
]
