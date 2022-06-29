from .models import Vault
from .serializers import UserSerializer, VaultSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response


class VaultViewSet(viewsets.ModelViewSet):
    serializer_class = VaultSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    # Override default queryset so that only logged in user's vault is returned
    def get_queryset(self):
        user = self.request.user
        return Vault.objects.filter(author=user).order_by("-created")

    # Override default model save instance to include a foreign key when new password is stored
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print("not valid")
            return

    # Delete ALL storage instances at once method (by visiting vault/delete)
    @action(methods=["DELETE"], detail=False)
    def delete(self, request):
        delete_storage = Vault.objects.filter(author=request.user)
        delete_storage.delete()
        return Response(data=None)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
