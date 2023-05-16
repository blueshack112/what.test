import typing

from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from products.models import Product
from products.serializers import ProductSerializer, ProductNamesSerializer
from utils.drf.permissions import IsAuthenticated


class ProductModelViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "list_keywords":
            return ProductNamesSerializer
        return super().get_serializer_class()

    @swagger_auto_schema(responses={200: ProductNamesSerializer})
    @action(detail=False, url_name="list-keywords", url_path="list-keywords")
    def list_keywords(self, request: Request):
        """
        Only get a list of product names for autofill. May not use this at all.
        :param request: DRF Request object
        """
        slugs: typing.List[str] = self.get_queryset().values_list("slug", flat=True)
        keywords = []
        for slug in slugs:
            keywords += slug.split("-")

        serializer: ProductNamesSerializer = self.get_serializer({"keywords": keywords})

        return Response(serializer.data, status=status.HTTP_200_OK)
