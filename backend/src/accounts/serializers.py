from rest_framework import serializers

from utils.enhancements import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
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
