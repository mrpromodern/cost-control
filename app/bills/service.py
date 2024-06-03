from app.bills.models import Bill
from app.service import BaseService


class BillService(BaseService):
    model = Bill