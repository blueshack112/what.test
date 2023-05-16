# Generated by Django 4.1.6 on 2023-05-16 08:27

from django.db import migrations, models
from django.utils.text import slugify


def update_product_slugs(apps, schema_editor):
    product_model = apps.get_model("products", "Product")
    for product in product_model.objects.filter(slug=None):
        product.slug = slugify(product.name)
        product.save(update_fields=["slug"])


class Migration(migrations.Migration):
    dependencies = [
        ("products", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="slug",
            field=models.SlugField(null=True),
        ),
        migrations.RunPython(
            update_product_slugs, reverse_code=migrations.RunPython.noop
        ),
    ]