from datetime import datetime, timedelta, timezone
from typing import Union
from fastapi import Depends, HTTPException, Request,status
from passlib.context import CryptContext
from pydantic import EmailStr
from app.config import settings
from jose import jwt,JWTError
from app.exceptions import IncorrectFormatTokenException, TokenAbsentException, TokenExpiredException, UserIsNotPresentException
from app.user.service import AuthUser
from app.config import settings


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)


async def authenticate_user(email: EmailStr, password: str):
    user = await AuthUser.find_one_or_none(email=email)
    if user and verify_password(password, user.password):
        return user
    return None


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, settings.ALGORITHM)
    return encoded_jwt


def create_refresh_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.REFRESH_SECRET_KEY, settings.ALGORITHM)
    return encoded_jwt


def decode_token(token: str, secret_key: str):
    try:
        decoded = jwt.decode(token, secret_key, algorithms=[settings.ALGORITHM])
        return decoded
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_token(request:Request):
    token  = request.cookies.get("access_token")
    if not token:
        raise TokenAbsentException
    return token

async def get_current_user(token:str = Depends(get_token)):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY,settings.ALGORITHM
        )
    except JWTError:
        raise IncorrectFormatTokenException
    
    expire:str = payload.get("exp")
    if not expire or (int(expire) < datetime.utcnow().timestamp()):
        raise TokenExpiredException
    
    user_id:str = payload.get("sub")
    if not user_id:
        raise UserIsNotPresentException
    
    user = await AuthUser.find_by_id(int(user_id))
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    return user