#!/usr/bin/env bash

set -euxo pipefail

coverage erase
coverage run manage.py test
coverage report
