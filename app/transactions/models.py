from app.database import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, Float, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

class TransactionType(enum.Enum):
    Expense = "Expense"
    Income = "Income"

class Transactions(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    category = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    date = Column(DateTime, nullable=False)
    comment = Column(Text, nullable=True)
    type = Column(Enum(TransactionType), nullable=False)
    bill_id = Column(Integer, ForeignKey("bills.id"), nullable=False)
    
    bill = relationship("Bill", back_populates="transactions")
