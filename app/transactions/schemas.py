from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum

class TransactionType(str, Enum):
    Expense = "Expense"
    Income = "Income"

class TransactionBase(BaseModel):
    category: str
    amount: float
    date: datetime
    comment: Optional[str] = None
    type: TransactionType

    @validator('date', pre=True, always=True)
    def format_date(cls, v):
        if isinstance(v, str):
            v = datetime.fromisoformat(v)
        if v.tzinfo is not None:
            v = v.replace(tzinfo=None)
        return v

class TransactionCreate(TransactionBase):
    bill_id: int

class Transaction(TransactionBase):
    id: int
    bill_id: int

  