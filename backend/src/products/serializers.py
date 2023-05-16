from rest_framework import serializers

from products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductNamesSerializer(serializers.Serializer):
    keywords = serializers.ListField(child=serializers.CharField())

    class Meta:
        fields = ["product_names"]
