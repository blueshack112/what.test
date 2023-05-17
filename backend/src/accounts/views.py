from rest_framework import status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from accounts.models import ActiveSearchAndSelection
from accounts.serializers import (
    UserSerializer,
    ActiveSearchAndSelectionSerializer,
    UserRegisterSerializer,
)
from utils.drf.permissions import IsAuthenticated
from utils.enhancements import get_user_model


# Create your views here.
class UserViewSet(ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.action == "create":
            # For user registration
            return UserRegisterSerializer
        return super().get_serializer_class()

    @action(
        detail=False,
        methods=["GET"],
        url_path="get-current",
        url_name="get-current-user",
    )
    def get_authenticated_user(self, request):
        """Get Authenticated User"""
        serializer = self.get_serializer_class()(
            instance=self.queryset.get(id=request.user.id)
        )
        return Response(
            status=status.HTTP_200_OK,
            data=serializer.data,
        )


class ActiveSearchAndSelectionViewSet(ModelViewSet):
    serializer_class = ActiveSearchAndSelectionSerializer
    queryset = ActiveSearchAndSelection.objects.all()
    permission_classes = [IsAuthenticated]
