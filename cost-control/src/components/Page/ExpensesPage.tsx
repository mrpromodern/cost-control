import { useState } from "react";
import ExpenseForm from "../Expenses/ExpenseForm";

interface Expenses {
    category: string;
    amount: number;
    date: string;
}

const ExpensesPage = () => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [expenses, setExpenses] = useState<Expenses[]>([]);

    const handleOpenForm = () => {
        console.log(isFormOpen);
        setIsFormOpen((prevState: boolean) => !prevState);
        console.log(isFormOpen);
    };

    const handleAddExpense = (expense: Expenses) => {
        setExpenses((prevState: any) => [...prevState, expense]);
    };

    return (
        <div>
            <button onClick={handleOpenForm}>Добавить расход</button>
            {isFormOpen && (
                <ExpenseForm
                    handleOpenForm={handleOpenForm}
                    handleAddExpense={handleAddExpense}
                />
            )}
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        Категория: {expense.category} | Сумма: {expense.amount}{" "}
                        | Дата:{" "}
                        {expense.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpensesPage;
