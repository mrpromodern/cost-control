import { makeAutoObservable } from "mobx";
import { IGroupBill } from "../type";


const emptyGroupBill: IGroupBill = {
    id: "",
    userId: "",
    name: "",
    bills: []
};

class GroupBill {
    groupBill = emptyGroupBill;

    constructor() {
        makeAutoObservable(this)
    }

    setGroupBill(groupBill: IGroupBill) {
        this.groupBill = groupBill;
    }

    resetGroupBill() {
        this.groupBill = emptyGroupBill;
    }
}

export const groupBillStore: GroupBill = new GroupBill();