from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masterrecipe', '0011_remove_recipe_directions_remove_recipe_ingredients_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='unit',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
