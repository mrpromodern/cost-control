import { useCallback, useEffect, useState } from "react";
import TransactionForm from "../components/Transactions/Form/Form";
import { ITransaction, TransactionType } from "../type";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import {
    createTransaction,
    deleteTransaction,
    getTransactions,
    updateTransaction,
} from "../API/Manager";
import TransactionItems from "../components/Transactions/Items";
import { categories } from "../components/Transactions/Form/Category";
import DialogForm from "../components/Form/Dialog";
import ButtonAdd from "../components/ButtonAdd";

const emptyTransaction: ITransaction = {
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
        useState<ITransaction>(emptyTransaction);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    const handleGetTransactions = useCallback(async () => {
        await getTransactions().then((response) => {
            const data = response.data;
            const transactions = data.map((data: ITransaction) => ({
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
        async (transaction: ITransaction) => {
            await createTransaction(transaction).then(handleGetTransactions);
            setTransaction(emptyTransaction);
        },
        [handleGetTransactions]
    );

    const handleUpdateTransaction = useCallback(
        async (transactionId: string, transaction: ITransaction) => {
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

    const handleSetTransaction = useCallback((transaction: ITransaction) => {
        setTransaction(transaction);
    }, []);

    useEffect(() => {
        handleGetTransactions();
    }, [handleGetTransactions]);

    return (
        <Box>
            <ButtonAdd handleClick={handleOpenForm} />
            <DialogForm
                title="Расход"
                isFormOpen={isFormOpen}
                handleOpenForm={handleOpenForm}
            >
                <TransactionForm
                    transaction={transaction}
                    handleOpenForm={handleOpenForm}
                    handleAddTransaction={handleAddTransaction}
                    handleUpdateTransaction={handleUpdateTransaction}
                    handleDeleteTransaction={handleDeleteTransaction}
                />
            </DialogForm>
            <TransactionItems
                transactions={transactions}
                handleOpenForm={handleOpenForm}
                handleSetTransaction={handleSetTransaction}
            />
        </Box>
    );
};

export default TransactionPage;
