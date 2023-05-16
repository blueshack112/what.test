from django.db import models

from products.models import Product
from utils.enhancements import get_user_model


class ActiveSearchAndSelection(models.Model):
    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="active_search_and_selection",
    )
    selected_products = models.ManyToManyField(Product)
    search_query = models.TextField(null=True, blank=True)
