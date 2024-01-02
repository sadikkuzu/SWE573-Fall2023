"""
Django settings for core project.
"""
import os
from datetime import timedelta
from pathlib import Path

import environ

env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
AUTH_USER_MODEL = 'masterrecipe.User'

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY', default="django-insecure-1(4fc^wt@$g1=k9&_7^9ovr6po)s352vef7#u#2#$j#_o%g5j%")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

BACKEND_ALLOWED_HOSTS = env("BACKEND_ALLOWED_HOSTS", default="localhost").strip()
BACKEND_CORS_ALLOWED_ORIGINS = env("BACKEND_CORS_ALLOWED_ORIGINS", default="http://localhost:3000").strip()

ALLOWED_HOSTS = BACKEND_ALLOWED_HOSTS.split(",")
CORS_ALLOWED_ORIGINS = BACKEND_CORS_ALLOWED_ORIGINS.split(",")


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'django_cleanup.apps.CleanupConfig',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',
    "masterrecipe",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"


# Database

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env("DB_NAME", default="postgres"),
        'USER': env("DB_USER", default="postgres"),
        'PASSWORD': env("DB_PASSWORD", default="postgres"),
        'HOST': env("DB_HOST", default="localhost"),
        'PORT': env("DB_PORT", default="5432"),
    },
}


# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {
            "min_length": 3,
        },
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Europe/Istanbul"

USE_I18N = True

USE_TZ = True

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': env("CLOUDINARY_CLOUD_NAME", default="dpdq7fxoo1"),
    'API_KEY': env('CLOUDINARY_API_KEY', default="5593127985492232"),
    'API_SECRET': env('CLOUDINARY_API_SECRET', default="DISt2AYelcTuwrjhMxODLj2ucwU3"),
}

MEDIA_ROOT = os.path.join(BASE_DIR, 'uploads')
MEDIA_URL = '/uploads/'
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# Static files (CSS, JavaScript, Images)

STATIC_URL = "static/"

# Default primary key field type

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# API
CORS_ORIGIN_WHITELIST = env("BACKEND_CORS_ORIGIN_WHITELIST", default="http://localhost:3000").strip().split(",")


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=50),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,
    'ALGORITHM': 'HS256',
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',
    'JTI_CLAIM': 'jti',
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}
