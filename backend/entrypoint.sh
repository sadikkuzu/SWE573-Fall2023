#!/usr/bin/env bash

set -euxo pipefail

# python manage.py makemigrations
# python manage.py migrate
python manage.py runserver
