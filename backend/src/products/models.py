from django.db import models
from django.utils.text import slugify

from utils.enhancements import get_user_model


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


class ActiveSearchAndSelection(models.Model):
    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="active_search_and_selection",
    )
    selected_products = models.ManyToManyField(Product)
    search_query = models.TextField(null=True, blank=True)
