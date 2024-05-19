import { Dayjs } from "dayjs";

export enum TransactionType {
    Expense = 'Expense',
    Income = 'Income'
}

export interface ITransaction {
    id: string;
    category: string;
    amount: number;
    date: Dayjs;
    comment: string;
    type: TransactionType;
    billId: string;
}

export interface IGroupBill {
    id: string;
    userId: string;
    name: string;
    bills: IBill[]
}

export interface IBill {
    id: string;
    groupBillId: string;
    name: string;
    balance: number;
}