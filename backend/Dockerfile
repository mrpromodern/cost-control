FROM python:3.10.12

WORKDIR /app
COPY . /app/

RUN pip install -r requirements.txt

CMD python3 manage.py migrate \
    && python3 manage.py runserver 0.0.0.0:8000
