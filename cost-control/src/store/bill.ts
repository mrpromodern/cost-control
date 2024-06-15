import { makeAutoObservable } from "mobx";
import { IBill } from "../type";
import { createBill, deleteBill, updateBill } from "../API/Manager";
import { groupBillStore } from "./groupBill";

const emptyBill: IBill = {
    id: "",
    groupBillId: "",
    name: "",
    balance: 0
};

class Bill {
    bill: IBill = { ...emptyBill };

    constructor() {
        makeAutoObservable(this)
    }

    setBill = (bill: IBill) => {
        this.bill = { ...bill };
    }

    resetBill = () => {
        this.bill = { ...emptyBill };
    }

    setBalance = (balance: number) => {
        this.bill.balance = balance;
    }

    createBill = async (bill: IBill) => {
        await createBill(bill);
        await groupBillStore.fetchGroupBills();
        this.resetBill();
    }

    updateBill = async (bill: IBill) => {
        await updateBill(bill.id, bill);
        await groupBillStore.fetchGroupBills();
        this.resetBill();
    }

    deleteBill = async (id: string) => {
        await deleteBill(id);
        await groupBillStore.fetchGroupBills();
        this.resetBill();
    }
}

export const billStore = new Bill();