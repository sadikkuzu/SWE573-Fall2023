# Master Recipe - Backend

For local development

```sh
cd backend
pip install -r requirements-dev.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

For initial construction

```sh
cd backend
pip install -r requirements.txt
django-admin startproject core .
python manage.py makemigrations
python manage.py migrate
python manage.py startapp masterrecipe
python manage.py runserver
```

For requirements dependency upgrades

```sh
cd backend
pip-compile -U
pip-compile requirements-dev.in -U
pip-compile requirements-tool.in -U
pip install -r requirements-dev.txt
```
