import random

import wonderwords
from django.core.management import BaseCommand, CommandParser

from products.models import Product


class Command(BaseCommand):
    def add_arguments(self, parser: CommandParser):
        parser.add_argument(
            "--quantity",
            "-q",
            help="Number of random products to create.",
            default=50,
            type=int,
            dest="quantity",
        )
        parser.add_argument(
            "--delete-old",
            "-d",
            help="Delete old products before adding these new ones.",
            default=False,
            type=bool,
            dest="delete-old",
        )

    def handle(self, *args, **options):
        if options["delete-old"]:
            self._delete_older_products()

        word_generator = wonderwords.RandomWord()
        for i in range(0, options["quantity"]):
            product_name = "{} {}".format(
                word_generator.word(include_categories=["adjective"]).title(),
                word_generator.word(include_categories=["noun"]).title(),
            )
            product_data = {
                "name": product_name,
                "description": f"{product_name} is an awesome product.",
                "price": random.uniform(12.00, 4500.99),
                "stock": random.randrange(1000),
            }
            Product.objects.create(**product_data)

    @staticmethod
    def _delete_older_products():
        Product.objects.all().delete()
