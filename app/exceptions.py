from typing import Any, Dict
from typing_extensions import Annotated, Doc
from fastapi import HTTPException,status

class BaseException(HTTPException):
    status_code = 500
    detail=""

    def __init__(self):
        super().__init__(status_code = self.status_code, detail = self.detail)

class UserAlreadyExistsException(BaseException):
    status_code=status.HTTP_409_CONFLICT
    detail="Пользователь уже существует"


class IncorectEmailorPassword(BaseException):
    status_code=status.HTTP_401_UNAUTHORIZED
    detail="Неверный пароль или почта"


class TokenExpiredException(BaseException):
    status_code=status.HTTP_401_UNAUTHORIZED
    detail="Токен истек"


class TokenAbsentException(BaseException):
    status_code=status.HTTP_401_UNAUTHORIZED
    detail="Токен отсутствует"


class IncorrectFormatTokenException(BaseException):
    status_code=status.HTTP_401_UNAUTHORIZED
    detail="Неверный формат токена"


class UserIsNotPresentException(BaseException):
    status_code=status.HTTP_401_UNAUTHORIZED
