from fastapi import FastAPI,Query
from typing import Optional
from pydantic import BaseModel
from datetime import date
from app.user.router import router as router_auth
from app.groupbills.router import router as router_bills
from app.bills.router import router as router_group_bills
from app.transactions.router import router as router_transactions
from app.cors import add_cors_middleware


app = FastAPI()

add_cors_middleware(app)

app.include_router(router=router_auth)
app.include_router(router=router_group_bills)
app.include_router(router=router_bills)
app.include_router(router=router_transactions)

