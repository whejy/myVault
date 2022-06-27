# Generated by Django 4.0.3 on 2022-06-27 05:38

from django.db import migrations
import encrypted_model_fields.fields


class Migration(migrations.Migration):

    dependencies = [
        ('vault', '0014_alter_vault_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vault',
            name='password',
            field=encrypted_model_fields.fields.EncryptedCharField(),
        ),
        migrations.AlterField(
            model_name='vault',
            name='username',
            field=encrypted_model_fields.fields.EncryptedCharField(),
        ),
    ]
