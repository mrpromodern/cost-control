import { makeAutoObservable } from "mobx";
import { ITransaction, TransactionType } from "../type";
import { categories } from "../components/Transactions/Form/Category";
import dayjs from "dayjs";

const emptyTransaction: ITransaction = {
    id: "",
    category: categories[0],
    amount: 0,
    date: dayjs(),
    comment: "",
    type: TransactionType.Expense,
    billId: "",
};

class Transaction {
    transaction = emptyTransaction;

    constructor() {
        makeAutoObservable(this)
    }

    setTransaction = (transaction: ITransaction) => {
        this.transaction = transaction;
    }

    resetTransaction = () => {
        const newTran = {
            id: "",
            category: this.transaction.category,
            amount: 0,
            date: dayjs(),
            comment: "",
            type: this.transaction.type,
            billId: "",
        }
        
        this.transaction = newTran;
    }

    setType = (type: TransactionType) => {
        this.transaction.type = type;
    }
}

export const tranStore: Transaction = new Transaction();