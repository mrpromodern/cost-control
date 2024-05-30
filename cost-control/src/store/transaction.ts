import { makeAutoObservable } from "mobx";
import { categories } from "../components/Transactions/Form/Category";
import dayjs, { Dayjs } from "dayjs";
import {
    createTransaction,
    deleteTransaction,
    getIncomeByBillId,
    getIncomeByGroupBillId,
    getTxByBillId,
    getTxByGroupBillId,
    updateTransaction,
    getBalanceByBillId,
    getCurrentBalanceByBillId,
    getExpensesByBillId,
    getCurrentBalanceByGroupBillId,
    getBalanceByGroupBillId,
    getExpensesByGroupBillId,
} from "../API/Manager";
import { ITransaction, TransactionType } from "../type";
import { billStore } from "./bill";
import { groupBillStore } from "./groupBill";

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
    transactions: ITransaction[] = [];

    income: number = 0;
    expense: number = 0;
    balance: number = 0;
    current: number = 0;

    startDate = dayjs().startOf("month");
    endDate = dayjs().endOf("month");

    isLoading = false;

    constructor() {
        makeAutoObservable(this);
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

    setTransactions = (data: any) => {
        if (data) {
            this.transactions = data.map((data: ITransaction) => ({
                ...data,
                date: dayjs(data.date),
            }));
        }
    }

    getTransactions = async () => {
        const billId = billStore.bill.id;
        const groupBillId = groupBillStore.groupBill.id;

        this.setIsLoading(true);
        if (billId) {
            const response = await getTxByBillId(billId);
            this.setTransactions(response.data);
        } else if (groupBillId) {
            const response = await getTxByGroupBillId(groupBillId);
            this.setTransactions(response.data);
        }
        this.setIsLoading(false);
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    }

    addTransaction = async (transaction: ITransaction) => {
        const fetchGroupBills = groupBillStore.fetchGroupBills;
        await createTransaction(transaction).then(() => this.getTransactions()).then(() => this.updateGeneral()).then(() => fetchGroupBills());
        this.resetTransaction();
    }

    updateTransaction = async (transactionId: string, transaction: ITransaction) => {
        const fetchGroupBills = groupBillStore.fetchGroupBills;
        await updateTransaction(transactionId, transaction).then(() => this.getTransactions()).then(() => this.updateGeneral()).then(() => fetchGroupBills());
        this.resetTransaction();
    }

    deleteTransaction = async (transactionId: string) => {
        const fetchGroupBills = groupBillStore.fetchGroupBills;
        await deleteTransaction(transactionId).then(() => this.getTransactions()).then(() => this.updateGeneral()).then(() => fetchGroupBills());
        this.resetTransaction();
    }

    updateGeneral = async () => {
        const billId = billStore.bill.id;
        const groupBillId = groupBillStore.groupBill.id;

        const startDate = this.startDate.toString();
        const endDate = this.endDate.toString();

        const incomeByBillResponse = await getIncomeByBillId(billId, startDate, endDate);
        const incomeByGroupBillResponse = await getIncomeByGroupBillId(groupBillId, startDate, endDate);
        const incomeByBill = incomeByBillResponse.data;
        const incomeByGroupBill = incomeByGroupBillResponse.data;
        this.setIncome(incomeByBill + incomeByGroupBill);

        const expenseByBillResponse = await getExpensesByBillId(billId, startDate, endDate);
        const expenseByGroupBillResponse = await getExpensesByGroupBillId(groupBillId, startDate, endDate);
        const expenseByBill = expenseByBillResponse.data;
        const expenseByGroupBill = expenseByGroupBillResponse.data;
        this.setExpense(expenseByBill + expenseByGroupBill);

        const balanceByBillResponse = await getBalanceByBillId(billId, startDate, endDate);
        const balanceByGroupBillResponse = await getBalanceByGroupBillId(groupBillId, startDate, endDate);
        const balanceByBill = balanceByBillResponse.data;
        const balanceByGroupBill = balanceByGroupBillResponse.data;
        this.setBalance(balanceByBill + balanceByGroupBill);

        const currentByBill = await getCurrentBalanceByBillId(billId);
        const currentByGroupBill = await getCurrentBalanceByGroupBillId(groupBillId);
        this.setCurrent(currentByBill.data + currentByGroupBill.data);
    }

    setStartDate = (date: Dayjs) => {
        this.startDate = date;
    }

    setEndDate = (date: Dayjs) => {
        this.endDate = date;
    }

    setIncome = (income: number) => {
        this.income = income;
    }

    setExpense = (expense: number) => {
        this.expense = expense;
    }

    setBalance = (balance: number) => {
        this.balance = balance;
    }

    setCurrent = (current: number) => {
        this.current = current;
    }
}

export const tranStore: Transaction = new Transaction();