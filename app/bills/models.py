from datetime import datetime
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String
from app.database import Base
from sqlalchemy.orm import relationship


class Bill(Base):
    __tablename__ = "bills"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    group_bill_id = Column(Integer, ForeignKey("group_bills.id"), nullable=False)
    name = Column(String, nullable=False)
    balance = Column(Float, nullable=False)
    currency = Column(String, default="USD")
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    group_bill = relationship("GroupBill", back_populates="bills")
    transactions = relationship("Transactions", back_populates="bill")