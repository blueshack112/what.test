import os
from importlib import import_module

service_id = os.environ.get("SERVICE_ID", "api").replace("-", "_")
settings = f"$$TODO(malx).{service_id}.settings"

print(f"Load settings `{settings}`")

# load settings module depending on `SERVICE_ID` environment variable
globals().update(import_module(settings).__dict__)
