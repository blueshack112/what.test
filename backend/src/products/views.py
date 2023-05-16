import typing

from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from products.models import Product, ActiveSearchAndSelection
from products.serializers import (
    ProductSerializer,
    ProductNamesSerializer,
    ProductSearchBodySerializer,
)
from utils.drf.permissions import IsAuthenticated


class ProductModelViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "list_keywords":
            return ProductNamesSerializer
        if self.action == "search":
            return ProductSearchBodySerializer
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

    @swagger_auto_schema(
        request_body=ProductSearchBodySerializer,
        responses={200: ProductSerializer(many=True)},
    )
    @action(detail=False, methods=["post"], url_name="search", url_path="search")
    def search(self, request: Request):
        request_serializer: ProductSearchBodySerializer = self.get_serializer(
            data=request.data
        )
        request_serializer.is_valid(raise_exception=True)
        query = request_serializer.validated_data.get("query")
        response_serializer = ProductSerializer(
            self.get_queryset().filter(slug__contains=query), many=True
        )

        if hasattr(self.request.user, "active_search_and_selection"):
            active_search_selection = self.request.user.active_search_and_selection
        else:
            active_search_selection = ActiveSearchAndSelection.objects.create(
                user=self.request.user
            )

        active_search_selection.search_query = query
        active_search_selection.save(update_fields=["search_query"])

        return Response(response_serializer.data, status=status.HTTP_200_OK)
