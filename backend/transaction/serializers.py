from rest_framework import serializers
from .models import Transaction, Bill


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
