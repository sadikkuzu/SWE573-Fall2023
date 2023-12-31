#!/usr/bin/env bash

set -euxo pipefail

pip install -qr requirements-dev.txt
coverage erase
coverage run manage.py test
coverage report
