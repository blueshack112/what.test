from rest_framework import serializers

from accounts.models import ActiveSearchAndSelection
from utils.enhancements import get_user_model


class ActiveSearchAndSelectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActiveSearchAndSelection
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    active_search_and_selection = ActiveSearchAndSelectionSerializer()

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
            "active_search_and_selection",
        ]
        read_only_fields = ["id", "last_login", "date_joined", "is_superuser"]
