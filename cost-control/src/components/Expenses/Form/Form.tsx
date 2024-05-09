import React, { useCallback, useState } from "react";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Dayjs } from "dayjs";
import FormSum from "./Sum";
import FormCategory from "./Category";
import FormDate from "./Date";
import FormComment from "./Comment";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Expense } from "../type";

type ExpenseFormProps = {
    expense: Expense;
    handleOpenForm: Function;
    handleAddExpense: Function;
    handleUpdateExpense: Function;
};

const ExpenseForm = (props: ExpenseFormProps) => {
    const theme = useTheme();
    const { expense, handleOpenForm, handleAddExpense, handleUpdateExpense } =
        props;

    const [amount, setAmount] = useState<number>(expense.amount);
    const [date, setDate] = useState<Dayjs>(expense.date);
    const [comment, setComment] = useState<string>(expense.comment);
    const [selectedCategory, setSelectedCategory] = useState<string>(
        expense.category
    );

    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);
    }, []);

    const handleAmountChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(event.target.value);
            setAmount(value);
        },
        []
    );

    const handleCommentChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setComment(event.target.value);
        },
        []
    );

    const handleSubmit = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();
            const id = expense.id;
            const newExpense: Expense = {
                id: id,
                category: selectedCategory,
                amount: amount,
                comment: comment,
                date: date,
            };

            if (id === "") {
                newExpense.id = new Date().toString();
                handleAddExpense(newExpense);
            } else {
                handleUpdateExpense(id, newExpense);
            }

            handleOpenForm();
        },
        [
            handleAddExpense,
            handleUpdateExpense,
            handleOpenForm,
            expense.id,
            selectedCategory,
            amount,
            comment,
            date,
        ]
    );

    return (
        <List
            sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius,
                minWidth: 400,
                padding: 0,
                "& .MuiListItem-root": {
                    minHeight: "60px",
                    padding: 0,
                },
                "& .MuiListItemButton-root": {
                    minHeight: "60px",
                    padding: 0,
                },
            }}
        >
            <Divider component="li" />

            <FormSum amount={amount} handleAmountChange={handleAmountChange} />

            <Divider component="li" />

            <FormCategory
                category={selectedCategory}
                handleCategorySelect={handleCategoryChange}
            />

            <Divider component="li" />

            <FormDate date={date} setDate={setDate} />

            <Divider component="li" />

            <FormComment handleCommentChange={handleCommentChange} />

            <Divider component="li" />

            <ListItem>
                <Button
                    onClick={handleSubmit}
                    sx={{ width: "100%" }}
                    variant="contained"
                >
                    Сохранить операцию
                </Button>
            </ListItem>
        </List>
    );
};

export default ExpenseForm;
