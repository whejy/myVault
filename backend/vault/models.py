from django.contrib.auth.models import User
from django.db import models
from encrypted_model_fields.fields import EncryptedCharField


class Vault(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    username = EncryptedCharField(max_length=30)
    password = EncryptedCharField(max_length=30)
    description = models.CharField(max_length=100, blank=True)
    url = models.URLField(max_length=255, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.username
