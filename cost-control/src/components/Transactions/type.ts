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