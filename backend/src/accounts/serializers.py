from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "last_login",
            "username",
            "first_name",
            "last_name",
            "email",
            "date_joined",
            "is_superuser",
        ]
        read_only_fields = ["id", "last_login", "date_joined", "is_superuser"]
