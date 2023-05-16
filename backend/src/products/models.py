from django.db import models
from django.utils.text import slugify


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=False)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    stock = models.IntegerField()
    slug = models.SlugField(null=True, blank=False)

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.slug = slugify(self.name)
        super().save(force_insert, force_update, using, update_fields)
