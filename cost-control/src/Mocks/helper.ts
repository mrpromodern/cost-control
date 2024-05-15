import { Bill, GroupBill, Transaction } from "../type";

export let groupBills = [
    {
        id: "411ce821-5ba7-4829-a3c9-d31f2763d26e",
        userId: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5",
        name: "Мои счета"
    },
    {
        id: "30d65281-6e8d-405a-8c3e-7e6dfa1cd6a1",
        userId: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5",
        name: "Накопления"
    },
    {
        id: "b77d652c-f5ae-4385-8099-0aa4e1f79836",
        userId: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5",
        name: "На будущее"
    }
]

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

export let transactions = [
    {
        id: "g7h8i9j0-k1l2-3m4n-5o6p-7q8r9s0t1u2v3",
        category: "Транспорт",
        amount: 35,
        date: "2020-06-20T15:30:00+01:00",
        comment: "Проезд на автобусе",
        type: "Expense",
        billId: "411ce821-5ba7-4829-a3c9-d31f2763d26e"
    },
    {
        id: "q1r2s3t4-u5v6-7w8x-9y0z-a1b2c3d4e5f6",
        category: "Здоровье",
        amount: 75,
        date: "2020-06-15T10:00:00+01:00",
        comment: "Посещение стоматолога",
        type: "Expense",
        billId: "411ce821-5ba7-4829-a3c9-d31f2763d26e"
    },
    {
        id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p",
        category: "Покупки",
        amount: 120,
        date: "2020-06-10T17:45:00+01:00",
        comment: "Продукты в супермаркете",
        type: "Expense",
        billId: "411ce821-5ba7-4829-a3c9-d31f2763d26e"
    },
    {
        id: "f2a35c7d-b3f6-4d6f-b2d9-c7d3a6e0a8f1",
        category: "Обед",
        amount: 450,
        date: "2020-06-10T13:30:00+01:00",
        comment: "Обед в ресторане",
        type: "Expense",
        billId: "411ce821-5ba7-4829-a3c9-d31f2763d26e"
    },
    {
        id: "bf8e0573-1e02-4798-a48e-3d760b89f47c",
        category: "Развлечения",
        amount: 258,
        date: "2020-06-10T11:00:00+01:00",
        comment: "За такси утром",
        type: "Expense",
        billId: "411ce821-5ba7-4829-a3c9-d31f2763d26e"
    }
]

export function getGroupBill(groupBillId: string) {
    return groupBills.find((groupBill) => groupBill.id === groupBillId);
}

export function createGroupBill(groupBill: GroupBill) {
    const newGroupBill = {
        id: generateUUID(),
        userId: groupBill.userId,
        name: groupBill.name
    }
    groupBills.push(newGroupBill);
}

export function updateGroupBill(groupBillId: string, groupBill: GroupBill) {
    const indexOldGroup = groupBills.findIndex((groupBill) => groupBill.id === groupBillId);
    const newGroupBill = {
        id: groupBillId,
        userId: groupBill.userId,
        name: groupBill.name
    }

    groupBills[indexOldGroup] = newGroupBill;
}

export function deleteGroupBill(groupBillId: string) {
    groupBills = groupBills.filter((groupBill) => groupBill.id !== groupBillId);;
}

export function getBill(billId: string) {
    return bills.find((bill) => bill.id === billId);
}

export function createBill(bill: Bill) {
    const newBill = {
        id: generateUUID(),
        groupBillId: bill.groupBillId,
        name: bill.name,
        balance: bill.balance
    }
    bills.push(newBill);
}

export function updateBill(billId: string, bill: Bill) {
    const indexOldBill = groupBills.findIndex((bill) => bill.id === billId);
    const newBill = {
        id: billId,
        groupBillId: bill.groupBillId,
        name: bill.name,
        balance: bill.balance
    }

    bills[indexOldBill] = newBill;
}

export function deleteBill(billId: string) {
    groupBills = groupBills.filter((bill) => bill.id !== billId);;
}

export function getTransaction(transactionId: string) {
    return transactions.find((transaction) => transaction.id === transactionId);
}

export function createTransaction(transaction: Transaction) {
    const newTransaction = {
        id: generateUUID(),
        category: transaction.category,
        amount: transaction.amount,
        date: transaction.date.toString(),
        comment: transaction.comment,
        type: transaction.type,
        billId: transaction.billId,
    }
    transactions.push(newTransaction);
}

export function updateTransaction(transactionId: string, transaction: Transaction) {
    const indexOldTran = transactions.findIndex((transaction) => transaction.id === transactionId);
    const newTransaction = {
        id: transactionId,
        category: transaction.category,
        amount: transaction.amount,
        date: transaction.date.toString(),
        comment: transaction.comment,
        type: transaction.type,
        billId: transaction.billId,
    }

    transactions[indexOldTran] = newTransaction;
}

export function deleteTransaction(transactionId: string) {
    transactions = transactions.filter((transaction) => transaction.id !== transactionId);;
}

export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}