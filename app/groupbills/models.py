from datetime import datetime
import uuid
from sqlalchemy import UUID, Column, DateTime, ForeignKey, Integer, String, Text
from app.database import Base
from sqlalchemy.orm import relationship


class GroupBill(Base):
    __tablename__ = "group_bills"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="group_bills") 
    bills = relationship("Bill", back_populates="group_bill")