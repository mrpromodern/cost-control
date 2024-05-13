from django.urls import path

from .views import APITransaction, APITransactionDetail


urlpatterns = [
    path('transactions/<str:pk>/', APITransactionDetail.as_view()),
    path('transactions/', APITransaction.as_view())
]
