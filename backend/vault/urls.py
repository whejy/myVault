from django.urls import path, include
from .views import VaultViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('vault', VaultViewSet, basename='vault')
router.register('users', UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
