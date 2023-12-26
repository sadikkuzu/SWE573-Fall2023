from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mycookbook', '0002_recipe'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='recipes'),
        ),
    ]
