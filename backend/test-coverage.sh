#!/usr/bin/env bash

set -euxo pipefail

pip install coverage
coverage erase
coverage run manage.py test
coverage report
