import { useState } from "react";
import ExpenseForm from "./Form/Form";
import { Expense } from "./type";
import ExpenseItems from "./Items";
import Button from "@mui/material/Button";

const ExpensePage = () => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const handleOpenForm = () => {
        setIsFormOpen((prevState: boolean) => !prevState);
    };

    const handleAddExpense = (expense: Expense) => {
        setExpenses((prevState: any) => [...prevState, expense]);
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpenForm}>
                Добавить расход
            </Button>
            {isFormOpen && (
                <ExpenseForm
                    handleOpenForm={handleOpenForm}
                    handleAddExpense={handleAddExpense}
                />
            )}
            <ExpenseItems expenses={expenses} />
        </>
    );
};

export default ExpensePage;
