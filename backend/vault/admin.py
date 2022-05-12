from django.contrib import admin
from .models import Vault

# admin.site.register(Vault)


@admin.register(Vault)
class VaultModel(admin.ModelAdmin):
    list_filter = ('author', 'username', 'password', 'description', 'url')
    list_display = ('author', 'username', 'password', 'description', 'url')
