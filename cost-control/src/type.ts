import { Dayjs } from "dayjs";

export enum TransactionType {
    Expense = 'Expense',
    Income = 'Income'
}

export interface Transaction {
    id: string;
    category: string;
    amount: number;
    date: Dayjs;
    comment: string;
    type: TransactionType;
    billId: string;
}

export interface GroupBill {
    id: string;
    userId: string;
    name: string;
}

export interface Bill {
    id: string;
    groupBillId: string;
    name: string;
    balance: number;
}