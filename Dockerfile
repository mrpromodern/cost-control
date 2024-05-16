# Используем официальный образ Python в качестве базового
FROM python:3.9-slim

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем requirements.txt в контейнер
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем оставшиеся файлы приложения в контейнер
COPY . .

# Открываем порт 8000 для доступа к приложению
EXPOSE 8000

# Запускаем команду для старта сервера Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
