# Generated by Django 4.0.3 on 2022-06-21 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vault', '0012_alter_vault_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vault',
            name='url',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
