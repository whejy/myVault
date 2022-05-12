from django.urls import path, include
from .views import VaultViewSet, UserViewSet
from rest_framework.routers import DefaultRouter
# VaultList, ItemDetails
# vault_list, item_details

router = DefaultRouter()
router.register('vault', VaultViewSet, basename='vault')
router.register('users', UserViewSet)


urlpatterns = [
    path('', include(router.urls)),

    # path('vault/', VaultList.as_view()),
    # path('vault/<int:id>/', ItemDetails.as_view())

    # path('vault/', vault_list),
    # path('vault/<int:pk>', item_details),

]
