from django.db import models
from django.contrib.auth.models import User


class Bill(models.Model):
    id = models.CharField(max_length=30, primary_key=True, verbose_name='ID')
    name = models.CharField(max_length=30, db_index=True, verbose_name='Название')
    user = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.PROTECT)
    balance = models.FloatField(verbose_name='Баланс')

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name_plural = 'Счета'
        verbose_name = 'Счет'
        ordering = ['name']


class Category(models.Model):
    name = models.CharField(max_length=20, db_index=True, verbose_name='Название')

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name_plural = 'Категории'
        verbose_name = 'Категория'
        ordering = ['name']


class Transaction(models.Model):
    class Types(models.TextChoices):
        EXPENSE = 'Expense', 'Расход'
        INCOME = 'Income', 'Доход'

    id = models.CharField(max_length=30, primary_key=True, verbose_name='ID')
    type = models.CharField(max_length=7, choices=Types.choices, default=Types.EXPENSE)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, verbose_name='Категория')
    amount = models.FloatField(verbose_name='Сумма')
    date = models.DateTimeField(db_index=True, verbose_name='Дата')
    comment = models.TextField(verbose_name='Описание')
    bill = models.ForeignKey(Bill, on_delete=models.PROTECT, verbose_name='Счет')

    def __str__(self) -> str:
        return self.comment

    class Meta:
        verbose_name_plural = 'Операции'
        verbose_name = 'Операция'
        ordering = ['-date']
