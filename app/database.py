from sqlalchemy.ext.asyncio import AsyncSession,create_async_engine
from sqlalchemy.orm import DeclarativeBase,sessionmaker
from app.config import settings




engine = create_async_engine(settings.DATABASE_URL)

async_session_maker = sessionmaker(engine,class_=AsyncSession,expire_on_commit=False)

class Base(DeclarativeBase):
    pass

from app.user.models import User
from app.groupbills.models import GroupBill
from app.bills.models import Bill
from app.transactions.models import Transactions