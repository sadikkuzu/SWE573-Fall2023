from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('masterrecipe', '0009_ingredient_amount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='direction',
            name='recipe',
        ),
        migrations.RemoveField(
            model_name='ingredient',
            name='recipe',
        ),
        migrations.AddField(
            model_name='recipe',
            name='Directions',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recipe', to='masterrecipe.direction'),
        ),
        migrations.AddField(
            model_name='recipe',
            name='ingredients',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recipe', to='masterrecipe.ingredient'),
        ),
    ]
