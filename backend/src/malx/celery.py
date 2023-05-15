import os
from celery import Celery
from django.conf import settings

# set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "$$TODO(malx).settings")

app = Celery('$$TODO"malx"')

app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

# Soft time limit raises an error if the tasks takes too long, will be retried if teh retries aren't exhausted
app.conf.task_soft_time_limit = 60 * 60 * 2  # 2 hours
# Hard time limit will kill the current worker if the tasks takes too long, will create a new worker
app.conf.task_time_limit = 60 * 60 * 12  # 12 hours


if __name__ == "__main__":
    app.start()
