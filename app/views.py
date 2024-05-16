# app/views.py
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from .models import User
from .serializers import UserSerializer, UserCreateSerializer

# Create your views here.

class RegisterView(generics.CreateAPIView):  # Класс для обработки регистрации пользователей.
    queryset = User.objects.all()      # Запрос для получения всех пользователей.
    serializer_class = UserCreateSerializer  # Используемый сериализатор.

    def create(self, request, *args, **kwargs):  # Метод для обработки POST-запроса на регистрацию.
        serializer = self.get_serializer(data=request.data)  # Получаем сериализатор с данными запроса.
        serializer.is_valid(raise_exception=True)  # Проверяем данные на валидность.
        user = serializer.save()  # Сохраняем пользователя.
        token = Token.objects.create(user=user)  # Создаем токен для пользователя.
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key,
        }, status=status.HTTP_201_CREATED)  # Возвращаем данные пользователя и токен.

class LoginView(APIView):  # Класс для обработки входа пользователей.
    def post(self, request, *args, **kwargs):  # Метод для обработки POST-запроса на вход.
        email = request.data.get('email')      # Получаем email из данных запроса.
        password = request.data.get('password')  # Получаем пароль из данных запроса.
        user = authenticate(request, email=email, password=password)  # Аутентифицируем пользователя.
        if user is not None:  # Если пользователь найден и аутентифицирован.
            login(request, user)  # Выполняем вход пользователя.
            token, created = Token.objects.get_or_create(user=user)  # Получаем или создаем токен для пользователя.
            return Response({
                "token": token.key,  # Возвращаем токен.
                "user": UserSerializer(user).data,  # Возвращаем данные пользователя.
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)  # Ошибка аутентификации.
