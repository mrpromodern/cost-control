from app.groupbills.models import GroupBill
from app.service import BaseService


class GroupBillService(BaseService):
    model = GroupBill

    
    # async def create_group_bill(cls,**data):
    #     async with async_session_maker() as session:
    #         query = insert(cls.model).values(**data).returning(cls.model)
    #         await session.execute(query)
    #         await session.commit()