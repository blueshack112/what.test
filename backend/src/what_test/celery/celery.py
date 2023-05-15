import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "what_test.settings")

app = Celery("what_test")

app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

if __name__ == "__main__":
    app.start()
