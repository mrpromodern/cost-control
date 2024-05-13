# Generated by Django 5.0.6 on 2024-05-13 12:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Bill",
            fields=[
                (
                    "id",
                    models.CharField(
                        max_length=30,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        db_index=True, max_length=30, verbose_name="Название"
                    ),
                ),
                ("balance", models.FloatField(verbose_name="Баланс")),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Пользователь",
                    ),
                ),
            ],
            options={
                "verbose_name": "Счет",
                "verbose_name_plural": "Счета",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="Transaction",
            fields=[
                (
                    "id",
                    models.CharField(
                        max_length=30,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "type",
                    models.CharField(
                        choices=[("Expense", "Расход"), ("Income", "Доход")],
                        default="Expense",
                        max_length=7,
                    ),
                ),
                ("category", models.CharField(max_length=20, verbose_name="Название")),
                ("amount", models.FloatField(verbose_name="Сумма")),
                ("date", models.DateTimeField(db_index=True, verbose_name="Дата")),
                ("comment", models.TextField(verbose_name="Описание")),
                (
                    "bill",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="transaction.bill",
                        verbose_name="Счет",
                    ),
                ),
            ],
            options={
                "verbose_name": "Операция",
                "verbose_name_plural": "Операции",
                "ordering": ["-date"],
            },
        ),
    ]
