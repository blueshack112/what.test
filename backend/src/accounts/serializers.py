from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

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


class UserRegisterSerializer(serializers.ModelSerializer):
    # Rest framework or django.contrib.auth probably has a serializer we can reuse
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=get_user_model().objects.all())],
    )
    password1 = serializers.CharField(
        source="password",
        write_only=True,
        required=True,
        validators=[validate_password],
    )
    password2 = serializers.CharField(write_only=True, required=True)
    fullname = serializers.CharField(
        write_only=False, required=True, source="first_name"
    )

    class Meta:
        model = get_user_model()
        fields = (
            "username",
            "password1",
            "password2",
            "email",
            "fullname",
        )

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs

    def create(self, validated_data):
        user_model = get_user_model()
        user = user_model.objects.create(
            username=validated_data.get("username"),
            email=validated_data.get("email"),
            first_name=validated_data.get("first_name"),
            is_active=True,
        )
        user.set_password(validated_data.get("password"))
        user.save(update_fields=["password"])

        return user
