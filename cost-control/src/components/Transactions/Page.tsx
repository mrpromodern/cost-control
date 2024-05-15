import { useCallback, useEffect, useState } from "react";
import TransactionForm from "./Form/Form";
import { Transaction, TransactionType } from "../../type";
import TransactionItems from "./Transactions";
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
import {
    createTransaction,
    deleteTransaction,
    getTransactions,
    updateTransaction,
} from "../../API/API";

const emptyTransaction: Transaction = {
    id: "",
    category: categories[0],
    amount: 0,
    date: dayjs(),
    comment: "",
    type: TransactionType.Expense,
    billId: "d2d7427e-c143-4854-8d59-c9a60b60e099",
};

const TransactionPage = () => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [transaction, setTransaction] =
        useState<Transaction>(emptyTransaction);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const handleGetTransactions = useCallback(async () => {
        await getTransactions().then((response) => {
            const data = response.data;
            const transactions = data.map((data: Transaction) => ({
                id: data.id,
                category: data.category,
                amount: data.amount,
                date: dayjs(data.date),
                comment: data.comment,
                type: data.type,
                billId: data.billId,
            })); // map для конвертации только даты
            setTransactions(transactions);
        });
    }, []);

    const handleOpenForm = useCallback(() => {
        setIsFormOpen((prevState: boolean) => !prevState);
    }, []);

    const handleAddTransaction = useCallback(
        async (transaction: Transaction) => {
            await createTransaction(transaction).then(handleGetTransactions);
            setTransaction(emptyTransaction);
        },
        [handleGetTransactions]
    );

    const handleUpdateTransaction = useCallback(
        async (transactionId: string, transaction: Transaction) => {
            await updateTransaction(transactionId, transaction).then(
                handleGetTransactions
            );
            setTransaction(emptyTransaction);
        },
        [handleGetTransactions]
    );

    const handleDeleteTransaction = useCallback(
        async (transactionId: string) => {
            await deleteTransaction(transactionId).then(handleGetTransactions);
            setTransaction(emptyTransaction);
        },
        [handleGetTransactions]
    );

    const handleSetTransaction = useCallback((transaction: Transaction) => {
        setTransaction(transaction);
    }, []);

    useEffect(() => {
        handleGetTransactions();
    }, [handleGetTransactions]);

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
                    <TransactionForm
                        transaction={transaction}
                        handleOpenForm={handleOpenForm}
                        handleAddTransaction={handleAddTransaction}
                        handleUpdateTransaction={handleUpdateTransaction}
                        handleDeleteTransaction={handleDeleteTransaction}
                    />
                </DialogContent>
            </Dialog>
            <TransactionItems
                transactions={transactions}
                handleOpenForm={handleOpenForm}
                handleSetTransaction={handleSetTransaction}
            />
        </Box>
    );
};

export default TransactionPage;
