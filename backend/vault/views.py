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
        serializer.save(author=self.request.user)

    # Delete ALL storage instances at once method (by visiting vault/delete)
    @action(methods=["DELETE"], detail=False)
    def delete(self, request):
        delete_storage = Vault.objects.filter(author=request.user)
        delete_storage.delete()
        return Response(data=None)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    """Gets all user's accounts"""
    # def get_queryset(self):
    #     return self.request.user.accounts.all()


"""
class VaultViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = Vault.objects.all()
    serializer_class = VaultSerializer
"""

"""
class VaultViewSet(viewsets.ViewSet):

    def list(self, request):
        items = Vault.objects.all()
        serializer = VaultSerializer(items, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = VaultSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        queryset = Vault.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = VaultSerializer(item)
        return Response(serializer.data)

    def update(self, request, pk=None):
        item = Vault.objects.get(pk=pk)
        serializer = VaultSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        item = Vault.objects.get(pk=pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

"""


"""
# Access vault
class VaultList(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Vault.objects.all()
    serializer_class = VaultSerializer

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)


# Access individual item
class ItemDetails(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  generics.GenericAPIView):

    queryset = Vault.objects.all()
    serializer_class = VaultSerializer

    lookup_field = 'id'

    def get(self, request, id):
        return self.retrieve(request, id=id)

    def put(self, request, id):
        return self.update(request, id=id)

    def delete(self, request, id):
        return self.destroy(request, id=id)

"""

# @api_view(['GET', 'POST'])
# def vault_list(request):

#     if request.method == 'GET':
#         vault_items = Vault.objects.all()
#         serializer = VaultSerializer(vault_items, many=True)
#         return Response(serializer.data)

#     elif request.method == "POST":
# serializer = VaultSerializer(data=request.data)
# if serializer.is_valid():
#     serializer.save()
#     return Response(serializer.data, status=status.HTTP_201_CREATED)
# return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Access individual vault item
# @api_view(['GET', 'PUT', 'DELETE'])
# def item_details(request, pk):

# try:
#     item = Vault.objects.get(pk=pk)
# except Vault.DoesNotExist:
#     return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == "GET":
#         serializer = VaultSerializer(item)
#         return Response(serializer.data)

# elif request.method == "PUT":
#     serializer = VaultSerializer(item, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == "DELETE":
# item.delete()
# return Response(status=status.HTTP_204_NO_CONTENT)
