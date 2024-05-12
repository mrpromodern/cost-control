from django.urls import path

from .views import api_category


urlpatterns = [
    path('transactions/', api_category)
]
