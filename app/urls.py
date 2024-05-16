from django.urls import path,include
from .views import RegisterView, LoginView

urlpatterns = [
    path('user/register/',RegisterView.as_view(),name='register'), # готовый пакет авторизации
    path('user/login/',LoginView.as_view(),name='login') # кастомное решение регистрации
]