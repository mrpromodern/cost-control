from rest_framework import generics
from rest_framework.response import Response
from .models import Transaction
from .serializers import TransactionSerializer


class APITransaction(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class APITransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

# Create your views here.
