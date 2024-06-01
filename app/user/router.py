from fastapi import APIRouter, HTTPException, Response, Depends
from sqlalchemy import select
from app.database import async_session_maker
from app.user.models import User
from app.user.service import AuthUser
from app.user.schemas import SUserRegister, SToken
from app.user.auth import (
    authenticate_user, 
    get_hashed_password, 
    create_access_token,
    create_refresh_token,
    decode_token
)
from app.config import settings

router = APIRouter(
    prefix='/auth',
    tags=['Авторизация и регистрация']
)

@router.post("/register")
async def register(user_data: SUserRegister):
    existing_user = await AuthUser.find_one_or_none(email=user_data.email)
    if existing_user:
        raise HTTPException(status_code=404)
    hashed_password = get_hashed_password(user_data.password)
    await AuthUser.insert_data_db(username=user_data.username, email=user_data.email, password=hashed_password)

@router.post("/login")
async def login(response: Response, user_data: SUserRegister):
    user = await authenticate_user(user_data.email, user_data.password)
    if not user:
        raise HTTPException(status_code=401)
    access_token = create_access_token({"sub": user.id})
    refresh_token = create_refresh_token({"sub": user.id})
    response.set_cookie("access_token", access_token, httponly=True)
    response.set_cookie("refresh_token", refresh_token, httponly=True)
    return {"access_token": access_token, "refresh_token": refresh_token,"id":user.id,"name":user.username,"email":user.email}

@router.post("/refresh")
async def refresh_token(response: Response, refresh_token: str):
    try:
        payload = decode_token(refresh_token, settings.REFRESH_SECRET_KEY)
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        access_token = create_access_token({"sub": user_id})
        response.set_cookie("access_token", access_token, httponly=True)
        return {"access_token": access_token}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")