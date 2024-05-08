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

const ExpensePage = () => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const handleOpenForm = useCallback(() => {
        setIsFormOpen((prevState: boolean) => !prevState);
    }, []);

    const handleAddExpense = useCallback((expense: Expense) => {
        setExpenses((prevState: Expense[]) => [...prevState, expense]);
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
                        handleOpenForm={handleOpenForm}
                        handleAddExpense={handleAddExpense}
                    />
                </DialogContent>
            </Dialog>
            <ExpenseItems expenses={expenses} />
        </Box>
    );
};

export default ExpensePage;
