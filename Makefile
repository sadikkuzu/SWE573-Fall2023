.PHONY: help

help:
	@echo "--------------------------------------------------------------------"
	@echo "                       Master Recipe                                "
	@echo "                  web app for social cooking                        "
	@echo "--------------------------------------------------------------------"
	@echo "        This Makefile assumes you have Docker and Docker Compose    "
	@echo "--------------------------------------------------------------------"
	@echo "  targets: compose-up, compose-down, env-files, help                "
	@echo "--------------------------------------------------------------------"
	@echo "    Local system up:                                                "
	@echo "          > make compose-up;                                        "
	@echo "    Local system down:                                              "
	@echo "          > make compose-down;                                      "
	@echo "    Local environment files:                                        "
	@echo "          > make env-files;                                         "
	@echo "    Help:                                                           "
	@echo "          > make;                                                   "
	@echo "          > make help;                                              "
	@echo "--------------------------------------------------------------------"

env-files:
ifeq ($(OS),Windows_NT)
	powershell ./hack/env-files.ps1
else
	./hack/env-files.sh
endif

compose-up: env-files
	docker-compose up -d --build

compose-down: env-files
	docker-compose down --remove-orphans
