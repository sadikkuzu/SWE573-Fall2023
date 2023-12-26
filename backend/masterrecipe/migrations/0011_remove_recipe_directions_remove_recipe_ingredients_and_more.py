from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mycookbook', '0010_remove_direction_recipe_remove_ingredient_recipe_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='Directions',
        ),
        migrations.RemoveField(
            model_name='recipe',
            name='ingredients',
        ),
        migrations.AddField(
            model_name='direction',
            name='recipe',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='directions', to='masterrecipe.recipe'),
        ),
        migrations.AddField(
            model_name='ingredient',
            name='recipe',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ingredients', to='masterrecipe.recipe'),
        ),
    ]
