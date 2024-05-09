import { useCallback, useState } from "react";
import ExpenseForm from "./Form/Form";
import { Expense } from "./type";
import ExpenseItems from "./Items";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import { categories } from "./Form/Category";
import dayjs from "dayjs";

const emptyExpense: Expense = {
    id: "",
    category: categories[0],
    amount: 0,
    date: dayjs(),
    comment: "",
};

const ExpensePage = () => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expense, setExpense] = useState<Expense>(emptyExpense);

    const handleOpenForm = useCallback(() => {
        setIsFormOpen((prevState: boolean) => !prevState);
    }, []);

    const handleAddExpenses = useCallback((expense: Expense) => {
        setExpenses((prevState: Expense[]) => [...prevState, expense]);
    }, []);

    const handleUpdateExpenses = useCallback(
        (expenseId: string, newExpense: Expense) => {
            const newExpenses: Expense[] = [...expenses];
            const expenseIndex: number = newExpenses.findIndex(
                (value) => expenseId === value.id
            );

            newExpenses[expenseIndex] = newExpense;

            setExpenses(newExpenses);
            setExpense(emptyExpense);
        },
        [expenses]
    );

    const handleSetExpense = useCallback((expense: Expense) => {
        setExpense(expense);
    }, []);

    return (
        <Box>
            <IconButton onClick={handleOpenForm}>
                <AddIcon />
            </IconButton>
            <Dialog open={isFormOpen} onClose={handleOpenForm}>
                <DialogTitle>Расход</DialogTitle>
                <IconButton
                    onClick={handleOpenForm}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ paddingBottom: "12px" }}>
                    <ExpenseForm
                        expense={expense}
                        handleOpenForm={handleOpenForm}
                        handleAddExpense={handleAddExpenses}
                        handleUpdateExpense={handleUpdateExpenses}
                    />
                </DialogContent>
            </Dialog>
            <ExpenseItems
                expenses={expenses}
                handleOpenForm={handleOpenForm}
                handleSetExpense={handleSetExpense}
            />
        </Box>
    );
};

export default ExpensePage;
