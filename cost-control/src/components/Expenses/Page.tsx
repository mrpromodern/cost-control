import { useState } from "react";
import ExpenseForm from "./Form/Form";
import { Expense } from "./type";
import ExpenseItems from "./Items";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

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
            <Dialog open={isFormOpen} onClose={handleOpenForm}>
                <DialogTitle>Расход</DialogTitle>
                <DialogContent sx={{paddingBottom: "12px"}}>
                    <ExpenseForm
                        handleOpenForm={handleOpenForm}
                        handleAddExpense={handleAddExpense}
                    />
                </DialogContent>
            </Dialog>
            <ExpenseItems expenses={expenses} />
        </>
    );
};

export default ExpensePage;
