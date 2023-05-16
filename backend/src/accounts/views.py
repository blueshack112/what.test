from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from accounts.serializers import UserSerializer


# Create your views here.
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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
