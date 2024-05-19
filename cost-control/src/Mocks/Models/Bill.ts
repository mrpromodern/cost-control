import { IBill } from "../../type";
import { generateUUID } from "../helper";
import { getGroupBill } from "./GroupBill";

export let bills = [
    {
        id: "00924f0b-c772-491f-831a-80329a07d0fa",
        groupBillId: "411ce821-5ba7-4829-a3c9-d31f2763d26e",
        name: "МелБанк",
        balance: 10050
    },
    {
        id: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5",
        groupBillId: "411ce821-5ba7-4829-a3c9-d31f2763d26e",
        name: "СберБанк",
        balance: 25000
    },
    {
        id: "x9y8z7w6-v5u4-t3s2-r1q-p0o9n8m7l6",
        groupBillId: "30d65281-6e8d-405a-8c3e-7e6dfa1cd6a1",
        name: "ВТБ",
        balance: 15600
    },
    {
        id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5",
        groupBillId: "30d65281-6e8d-405a-8c3e-7e6dfa1cd6a1",
        name: "Тинькофф",
        balance: 8700
    },
    {
        id: "25679368-ddeb-4763-aad0-75c4c2f1d53f",
        groupBillId: "b77d652c-f5ae-4385-8099-0aa4e1f79836",
        name: "Альфа-Банк",
        balance: 18900
    }
]

export function getBill(billId: string) {
    return bills.find((bill) => bill.id === billId);
}

export function getBills(groupBillId: string): IBill[] {
    return bills.filter((bill) => bill.groupBillId === groupBillId);
}

export function createBill(bill: IBill) {
    const groupBill = getGroupBill(bill.groupBillId);
    const newBill = {
        id: generateUUID(),
        groupBillId: bill.groupBillId,
        name: bill.name,
        balance: bill.balance
    }

    if (groupBill) {
        groupBill.bills.push(newBill);
    }
}

export function updateBill(billId: string, bill: IBill) {
    const indexOldBill = bills.findIndex((bill) => bill.id === billId);
    const newBill = {
        id: billId,
        groupBillId: bill.groupBillId,
        name: bill.name,
        balance: bill.balance
    }

    bills[indexOldBill] = newBill;
}

export function deleteBill(billId: string) {
    bills = bills.filter((bill) => bill.id !== billId);;
}