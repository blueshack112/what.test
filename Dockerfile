FROM python:3.9.15-slim-buster
ENV PYCURL_SSL_LIBRARY=openssl
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

ADD backend/src/requirements.txt /root/.cache/
RUN pip install -r /root/.cache/requirements.txt

ADD backend/src /code/

COPY backend/entrypoints /entrypoints
RUN sed -i 's/\r$//g' /entrypoints/wait_for_db.sh
RUN chmod -R +x /entrypoints/wait_for_db.sh

CMD uwsgi --http=0.0.0.0:80 --module=what_test.wsgi
