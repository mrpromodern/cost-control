import { ITransaction } from "../../type";
import { generateUUID } from "../helper";

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

export function getTransaction(transactionId: string) {
    return transactions.find((transaction) => transaction.id === transactionId);
}

export function createTransaction(transaction: ITransaction) {
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

export function updateTransaction(transactionId: string, transaction: ITransaction) {
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