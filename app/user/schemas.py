from pydantic import BaseModel,EmailStr

class SUserRegister(BaseModel):
    email:EmailStr
    password:str
    username:str

class SToken(BaseModel):
    access_token: str
    refresh_token: str

class UpdateUserName(BaseModel):
    username:str