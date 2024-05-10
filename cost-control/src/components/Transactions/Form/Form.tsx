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
import { Transaction, TransactionType } from "../type";

type TransactionFormProps = {
    Transaction: Transaction;
    handleOpenForm: Function;
    handleAddTransaction: Function;
    handleUpdateTransaction: Function;
};

const TransactionForm = (props: TransactionFormProps) => {
    const theme = useTheme();
    const { Transaction, handleOpenForm, handleAddTransaction, handleUpdateTransaction } =
        props;

    const [amount, setAmount] = useState<number>(Transaction.amount);
    const [date, setDate] = useState<Dayjs>(Transaction.date);
    const [comment, setComment] = useState<string>(Transaction.comment);
    const [selectedCategory, setSelectedCategory] = useState<string>(
        Transaction.category
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
            const id = Transaction.id;
            const newTransaction: Transaction = {
                id: id,
                category: selectedCategory,
                amount: amount,
                comment: comment,
                date: date,
                type: TransactionType.Expense,
            };

            if (id === "") {
                newTransaction.id = new Date().toString();
                handleAddTransaction(newTransaction);
            } else {
                handleUpdateTransaction(id, newTransaction);
            }

            handleOpenForm();
        },
        [
            handleAddTransaction,
            handleUpdateTransaction,
            handleOpenForm,
            Transaction.id,
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

export default TransactionForm;
