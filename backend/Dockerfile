#syntax=docker/dockerfile:1.2

FROM python:3.9.15-slim-buster as builder
# Needed for pycurl
ENV PYCURL_SSL_LIBRARY=openssl

RUN touch /etc/apt/apt.conf.d/99fixbadproxy \
  && echo "Acquire::http::Pipeline-Depth 0;" >> /etc/apt/apt.conf.d/99fixbadproxy

RUN apt-get update \
  && apt-get install -y  \
    curl \
    git \
    build-essential \
    libpq5 \
    libpq-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

ADD src/requirements.txt /root/.cache/
RUN --mount=type=cache,id=what_test-pip,target=/root/.cache/pip pip cache list
RUN --mount=type=cache,id=what_test-pip,target=/root/.cache/pip pip install wheel setuptools \
    && pip install -r /root/.cache/requirements.txt


FROM python:3.9.15-slim-buster as app
ENV PYTHONUNBUFFERED=1
WORKDIR /code
RUN touch /etc/apt/apt.conf.d/99fixbadproxy \
  && echo "Acquire::http::Pipeline-Depth 0;" >> /etc/apt/apt.conf.d/99fixbadproxy \
  && apt-get update \
  && apt-get install -y \
    git \
    curl \
    htop \
    build-essential \
    libpq5 \
    libpq-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*
#python3-llvmlite

COPY --from=builder /root/.cache /root/.cache
RUN  --mount=type=cache,id=what_test-pip,target=/root/.cache/pip pip install -r /root/.cache/requirements.txt

# configure application environment settings
ENV CELERY_BEAT_SCHEDULE_FILENAME=/var/run/what-test/celerybeat-schedule

ADD src /code/

COPY entrypoints/ /entrypoints
RUN sed -i 's/\r$//g' /entrypoints/wait_for_db.sh
RUN chmod -R +x /entrypoints/wait_for_db.sh

CMD ["python", "manage.py", "runserver"]
