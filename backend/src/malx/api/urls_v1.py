from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from vulnerability_test.views import AttackData

app_name = "v1"

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/test/", include("vulnerability_test.urls")),
    path("api/attackdata/", AttackData.as_view(), name="attack_data"),
    path("api/package/", include("packaged_test.urls")),
    path("api/user/", include("accounts.urls")),
]
