from unittest.util import _MAX_LENGTH
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    pass

    def __str__(self):
        return self.username

class Recipe(models.Model):
    name = models.CharField(max_length=250, unique=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='recipes', blank=True, null=True,)
    description = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class Ingredient(models.Model):
    name = models.CharField(max_length=125)
    amount = models.CharField(max_length=250, blank=True, null=True)
    unit = models.CharField(max_length=250, blank=True, null=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="ingredients", blank=True, null=True)
    ## ADD Quantity and Standard measurements later ##

    def __str__(self):
        return f"{self.name} in {self.recipe}"

class Direction(models.Model):
    content = models.CharField(max_length=250)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="directions", blank=True, null=True)

    def __str__(self):
        return f"{self.name} in {self.recipe}"
