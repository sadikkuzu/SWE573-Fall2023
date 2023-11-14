#!/usr/bin/env bash

set -euxo pipefail

touch ./backend/core/.env
touch ./frontend/.env
touch ./.env

docker compose up -d --build
