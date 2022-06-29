from django.contrib import admin
from .models import Vault


@admin.register(Vault)
class VaultModel(admin.ModelAdmin):
    list_filter = ('author', 'description', 'url', 'created')
    list_display = ('author', 'description', 'url', 'created')
    exclude = ('username', 'password')
