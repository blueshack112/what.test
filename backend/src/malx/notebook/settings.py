# -*- coding: utf-8 -*-
from __future__ import annotations

from malx.settings_base import *

NOTEBOOK_ARGUMENTS = [
    "--ip",
    "0.0.0.0",
    "--port",
    os.environ.get("NOTEBOOK_PORT", "8888"),
    "--no-browser",
    "--NotebookApp.password='argon2:$argon2id$v=19$m=10240,t=10,p=8$jJ57sn8jo5JEmZPG2kCFow$dAmGRVOb80cJShCu43M0oA'",
    "--NotebookApp.allow_password_change=False",
    f'--NotebookApp.custom_display_url={os.environ.get("NOTEBOOK_CUSTOM_DISPLAY_URL", "")}',
    f'--NotebookApp.shutdown_no_activity_timeout={os.environ.get("NOTEBOOK_SHUTDOWN_NO_ACTIVITY_TIMEOUT", 3600)}',
    f'--MappingKernelManager.cull_idle_timeout={os.environ.get("NOTEBOOK_CULL_IDLE_TIMEOUT", 900)}',
    f'--MappingKernelManager.cull_interval={os.environ.get("NOTEBOOK_CULL_IDLE_TIMEOUT", 300)}',
    f'--GatewayKernelManager.cull_idle_timeout={os.environ.get("NOTEBOOK_CULL_IDLE_TIMEOUT", 900)}',
    f'--GatewayKernelManager.cull_interval={os.environ.get("NOTEBOOK_CULL_IDLE_TIMEOUT", 300)}',
]

if get_bool_env("ALLOW_ROOT", False):
    NOTEBOOK_ARGUMENTS.append("--allow-root")
