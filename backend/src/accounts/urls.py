from django.urls import path, include
from rest_framework import routers

from accounts.views import UserViewSet, ActiveSearchAndSelectionViewSet

router = routers.DefaultRouter()
router.register(r"", UserViewSet, "users")
router.register(r"search-and-selection", ActiveSearchAndSelectionViewSet, "search-and-selection")


urlpatterns = [
    path("", include(router.urls)),
]
