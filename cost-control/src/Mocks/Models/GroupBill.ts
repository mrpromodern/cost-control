import { IGroupBill } from "../../type";
import { generateUUID } from "../helper";
import { getBills } from "./Bill";

export let groupBills: IGroupBill[] = [
    {
        id: "411ce821-5ba7-4829-a3c9-d31f2763d26e",
        userId: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5",
        name: "Мои счета",
        bills: [],
    },
    {
        id: "30d65281-6e8d-405a-8c3e-7e6dfa1cd6a1",
        userId: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5",
        name: "Накопления",
        bills: [],
    },
    {
        id: "b77d652c-f5ae-4385-8099-0aa4e1f79836",
        userId: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5",
        name: "На будущее",
        bills: [],
    }
]

export function getGroupBill(groupBillId: string) {
    return groupBills.find((groupBill) => groupBill.id === groupBillId);
}

export function getGroupBills() {
    groupBills.forEach(groupBill => {
        groupBill.bills = getBills(groupBill.id);
    });
    return groupBills;
}

export function createGroupBill(groupBill: IGroupBill) {
    const newGroupBill = {
        id: generateUUID(),
        userId: groupBill.userId,
        name: groupBill.name,
        bills: groupBill.bills
    }
    groupBills.push(newGroupBill);
}

export function updateGroupBill(groupBillId: string, groupBill: IGroupBill) {
    const indexOldGroup = groupBills.findIndex((groupBill) => groupBill.id === groupBillId);
    const newGroupBill = {
        id: groupBillId,
        userId: groupBill.userId,
        name: groupBill.name,
        bills: groupBill.bills
    }

    groupBills[indexOldGroup] = newGroupBill;
}

export function deleteGroupBill(groupBillId: string) {
    groupBills = groupBills.filter((groupBill) => groupBill.id !== groupBillId);;
}