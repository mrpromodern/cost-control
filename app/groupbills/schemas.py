from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class BillBase(BaseModel):
    name: str
    balance: float
    currency: Optional[str] = "USD"

class BillCreate(BillBase):
    group_bill_id: int

class Bill(BillBase):
    id: int
    group_bill_id: int
    created_at: datetime
    updated_at: datetime

   

class GroupBillBase(BaseModel):
    name: str
    description: Optional[str]

class GroupBillCreate(GroupBillBase):
    pass

class GroupBillUpdate(GroupBillBase):
    pass

class GroupBill(GroupBillBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    bills: Optional[List[Bill]] = []

