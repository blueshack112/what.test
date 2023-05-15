from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=False)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    stock = models.IntegerField()
