# Generated by Django 3.2.5 on 2022-05-18 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vault', '0010_vault_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vault',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
