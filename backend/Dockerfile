FROM python:3.10-slim-buster

LABEL maintainer="SADIK KUZU <sadik.kuzu@boun.edu.tr>"

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# In order to cope with pip root user warning
# Reference: https://stackoverflow.com/a/71240462/7030591
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements-dev.txt requirements-dev.txt

RUN : \
      && python -m pip install -q --no-cache-dir --upgrade pip \
      && pip install -q --no-cache-dir --requirement requirements-dev.txt \
      && :

COPY . .

EXPOSE 8000

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
