from app.bills.models import Bill
from app.groupbills.models import GroupBill
from app.service import BaseService
from app.transactions.models import Transactions
from sqlalchemy import delete, insert, select, update
from app.database import async_session_maker

class TransactionService(BaseService):
    model = Transactions

    async def get_user_transactions(cls, user_id: int):
        async with async_session_maker() as session:
            query = select(cls.model).join(Bill).join(GroupBill).filter(GroupBill.user_id == user_id)
            result = await session.execute(query)
            return result.scalars().all()