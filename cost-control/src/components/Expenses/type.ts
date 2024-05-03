import { Dayjs } from "dayjs";

export interface Expense {
    category: string;
    amount: number;
    date: Dayjs;
    comment: string;
}