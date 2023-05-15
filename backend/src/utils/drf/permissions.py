from rest_framework import permissions
from rest_framework.request import Request


class IsAuthenticated(permissions.BasePermission):
    def has_permission(self, request: Request, view):
        return request.user.is_authenticated and not request.user.is_anonymous
