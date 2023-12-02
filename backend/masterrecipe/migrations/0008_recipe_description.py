from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mycookbook', '0007_recipe_image_delete_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='description',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
