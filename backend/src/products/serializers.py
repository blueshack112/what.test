from rest_framework import serializers

from products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductSearchBodySerializer(serializers.Serializer):
    query = serializers.CharField(allow_null=False, allow_blank=False)


class ProductNamesSerializer(serializers.Serializer):
    keywords = serializers.ListField(child=serializers.CharField())

    class Meta:
        fields = ["product_names"]
