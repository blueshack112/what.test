from django.urls import path, include
from rest_framework import routers

from products.views import ProductModelViewSet

router = routers.DefaultRouter()
router.register(r"", ProductModelViewSet, "product")

urlpatterns = [
    path("", include(router.urls)),
]
