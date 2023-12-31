from django.db import migrations
from django.db import models


class Migration(migrations.Migration):
    dependencies = [
        ('masterrecipe', '0002_recipe'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='recipes'),
        ),
    ]
