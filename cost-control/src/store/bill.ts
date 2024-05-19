import { makeAutoObservable } from "mobx";
import { IBill } from "../type";

const emptyBill: IBill = {
    id: "",
    groupBillId: "",
    name: "",
    balance: 0
};

class Bill {
    bill = emptyBill;

    constructor() {
        makeAutoObservable(this)
    }

    setBill(bill: IBill) {
        this.bill = bill;
    }
}

export const user: Bill = new Bill();