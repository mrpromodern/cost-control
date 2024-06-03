from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class BillBase(BaseModel):
    group_bill_id:int
    name:str
    balance:float

class Bill(BillBase):
    id: int
    currency: str = "USD"
    type: str = "checking"
    created_at: datetime
    updated_at: datetime