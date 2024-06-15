import { makeAutoObservable } from "mobx";
import { IGroupBill } from "../type";
import { createGroupBill, deleteGroupBill, getGroupBills, updateGroupBill } from "../API/Manager";


const emptyGroupBill: IGroupBill = {
    id: "",
    userId: "",
    name: "",
    bills: []
};

class GroupBill {
    groupBill = { ...emptyGroupBill };
    groupBills: IGroupBill[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setGroupBill = (groupBill: IGroupBill) => {
        this.groupBill = { ...groupBill };
    }

    setGroupBills = (groupBills: IGroupBill[]) => {
        this.groupBills = [...groupBills];
    }

    resetGroupBill = () => {
        this.groupBill = { ...emptyGroupBill };
    }

    // ------------- Group Bill -------------

    createGroupBill = async (groupBill: IGroupBill) => {
        await createGroupBill(groupBill);
        await this.fetchGroupBills();
        this.resetGroupBill();
    }

    updateGroupBill = async (groupBill: IGroupBill) => {
        await updateGroupBill(groupBill.id, groupBill);
        await this.fetchGroupBills();
        this.resetGroupBill();
    }

    deleteGroupBill = async (id: string) => {
        await deleteGroupBill(id);
        await this.fetchGroupBills();
        this.resetGroupBill();
    }

    // ------------- Group Bills -------------

    fetchGroupBills = async () => {
        try {
            getGroupBills().then((response) => this.setGroupBills(response.data));
        } catch (error) {
            console.error("Failed to fetch group bills", error);
        }
    }
}

export const groupBillStore = new GroupBill();