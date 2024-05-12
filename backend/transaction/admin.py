from django.contrib import admin

from .models import Category, Bill, Transaction

admin.site.register(Category)
admin.site.register(Bill)
admin.site.register(Transaction)
# Register your models here.
