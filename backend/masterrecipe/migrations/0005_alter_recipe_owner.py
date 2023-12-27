import django.db.models.deletion
from django.conf import settings
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):
    dependencies = [
        ('masterrecipe', '0004_alter_recipe_name_ingredient_direction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
