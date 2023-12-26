from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masterrecipe', '0006_remove_recipe_image_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='recipes'),
        ),
        migrations.DeleteModel(
            name='Image',
        ),
    ]
