from fastapi import APIRouter, Depends, HTTPException

from app.bills.models import Bill
from app.bills.service import BillService
from app.groupbills.schemas import BillCreate
from app.groupbills.service import GroupBillService
from app.user.auth import get_current_user
from app.user.models import User


router = APIRouter(
    tags=['Cчета']
)

@router.get("/bills")
async def get_bills(current_user: User = Depends(get_current_user)):
    # Получаем группы счетов для текущего пользователя
    user_group_bills = await GroupBillService.find_all({"user_id": current_user.id})

    # Список для хранения счетов
    user_bills = []
    
    # Для каждой группы счетов пользователя
    for group_bill in user_group_bills:
        # Получаем все счета для этой группы счетов и добавляем их в список
        bills = await BillService.find_all({"group_bill_id":group_bill.id})
        user_bills.extend(bills)
    
    return user_bills
    

@router.post("/bills")
async def create_bill(bill:BillCreate, current_user: User = Depends(get_current_user)):
    group_bill = await GroupBillService.find_by_id(bill.group_bill_id)
    if group_bill.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to add bill to this group")
    await BillService.insert_data_db(**bill.dict())
    

@router.get("/bills/{bill_id}")
async def get_bill_by_id(bill_id: int):
    bill = await BillService.find_by_id(bill_id)
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    return bill

@router.put("/bills/{bill_id}")
async def update_bill_by_id(bill_id: int, updated_bill:BillCreate, current_user: User = Depends(get_current_user)):
    bill = await BillService.find_by_id(bill_id)
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    group_bill = await GroupBillService.find_by_id(bill.group_bill_id)
    if group_bill.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this bill")
    await BillService.update_data(bill_id, **updated_bill.dict())
    return await BillService.find_by_id(bill_id)

@router.delete("/bills/{bill_id}")
async def delete_bill_by_id(bill_id: int, current_user: User = Depends(get_current_user)):
    bill = await BillService.find_by_id(bill_id)
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    group_bill = await GroupBillService.find_by_id(bill.group_bill_id)
    if group_bill.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this bill")
    await BillService.delete_by_id(bill_id)
    return