from fastapi import HTTPException
from app.groupbills.models import GroupBill
from app.groupbills.service import GroupBillService


async def create_group_bill_in_db(group_bill:GroupBill):
    try:
        return await GroupBillService.insert_data_db(
            user_id=group_bill.user_id, name=group_bill.name, description=group_bill.description
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))