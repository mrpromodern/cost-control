import { Dayjs } from "dayjs";

export interface Expense {
    id: string;
    category: string;
    amount: number;
    date: Dayjs;
    comment: string;
}