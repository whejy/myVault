from django.contrib.auth.models import User
from django.db import models
from django.core.validators import URLValidator


class Vault(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    description = models.CharField(max_length=100, blank=True)
    url = models.URLField(max_length=255, blank=True, validators=[URLValidator])
    created = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.username
