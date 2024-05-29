import { makeAutoObservable } from "mobx";

class Income {
    income = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setIncome = (income: number) => {
        this.income = income;
    }

    resetIncome() {
        this.income = 0;
    }
}

class Expense {
    expense = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setExpense = (expense: number) => {
        this.expense = expense;
    }

    resetExpense() {
        this.expense = 0;
    }
}

class Balance {
    balance = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setBalance = (balance: number) => {
        this.balance = balance;
    }

    resetBalance() {
        this.balance = 0;
    }
}

class Current {
    current = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setCurrent = (current: number) => {
        this.current = current;
    }

    resetCurrent() {
        this.current = 0;
    }
}

export const incomeStore: Income = new Income();
export const expenseStore: Expense = new Expense();
export const balanceStore: Balance = new Balance();
export const currentStore: Current = new Current();