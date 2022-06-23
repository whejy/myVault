from xml.dom import ValidationErr
from django.forms import ValidationError
from rest_framework import serializers
from .models import Vault
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token


class VaultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vault
        fields = ("id", "author", "username", "password", "description", "url")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]

        extra_kwargs = {"password": {"write_only": True, "required": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
