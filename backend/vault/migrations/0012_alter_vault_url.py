# Generated by Django 4.0.3 on 2022-06-21 07:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vault', '0011_alter_vault_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vault',
            name='url',
            field=models.URLField(blank=True, max_length=255),
        ),
    ]
