from fastapi import FastAPI,Query
from typing import Optional
from pydantic import BaseModel
from datetime import date
from app.user.router import router as router_auth
from app.cors import add_cors_middleware


app = FastAPI()

add_cors_middleware(app)

app.include_router(router=router_auth)

