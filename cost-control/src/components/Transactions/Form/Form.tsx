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
import { Transaction, TransactionType } from "../../../type";
import FormButton from "./Button";

type TransactionFormProps = {
    transaction: Transaction;
    handleOpenForm: Function;
    handleAddTransaction: Function;
    handleUpdateTransaction: Function;
    handleDeleteTransaction: Function;
};

const TransactionForm = (props: TransactionFormProps) => {
    const theme = useTheme();
    const {
        transaction,
        handleOpenForm,
        handleAddTransaction,
        handleUpdateTransaction,
        handleDeleteTransaction,
    } = props;

    const [amount, setAmount] = useState<number>(transaction.amount);
    const [date, setDate] = useState<Dayjs>(transaction.date);
    const [comment, setComment] = useState<string>(transaction.comment);
    const [selectedCategory, setSelectedCategory] = useState<string>(
        transaction.category
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

    const handleDelete = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();
            const id = transaction.id;
            handleDeleteTransaction(id);
            handleOpenForm();
        },
        [transaction, handleDeleteTransaction, handleOpenForm]
    );

    const handleSubmit = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();
            const id = transaction.id;

            const newTransaction: Transaction = {
                id: id,
                category: selectedCategory,
                amount: amount,
                comment: comment,
                date: date,
                type: TransactionType.Expense,
                billId: "d2d7427e-c143-4854-8d59-c9a60b60e099",
            };

            if (id === "") {
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
            transaction.id,
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

            <FormButton onClick={handleSubmit} color="primary">
                Сохранить операцию
            </FormButton>

            <FormButton onClick={handleDelete} color="error">
                Удалить операцию
            </FormButton>
        </List>
    );
};

export default TransactionForm;
