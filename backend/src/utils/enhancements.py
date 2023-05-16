from django.contrib.auth import get_user_model as gum
from django.contrib.auth.models import User


def get_user_model() -> User:
    """Only to get typehints when using this function"""
    return gum()
