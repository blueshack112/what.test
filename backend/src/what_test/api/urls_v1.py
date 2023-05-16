from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

app_name = "v1"

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/products/", include("products.urls")),
    path("api/users/", include("accounts.urls")),
]
