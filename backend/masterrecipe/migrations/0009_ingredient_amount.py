from django.db import migrations
from django.db import models


class Migration(migrations.Migration):
    dependencies = [
        ('masterrecipe', '0008_recipe_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='amount',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
