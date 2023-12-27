from django.contrib import admin

from .models import Direction
from .models import Ingredient
from .models import Recipe
from .models import User

admin.site.register(Recipe)
admin.site.register(User)
admin.site.register(Ingredient)
admin.site.register(Direction)
