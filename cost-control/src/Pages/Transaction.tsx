import { useCallback, useEffect, useState } from "react";
import TransactionForm from "../components/Transactions/Form/Form";
import { ITransaction, TransactionType } from "../type";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import {
    createTransaction,
    deleteTransaction,
    getTxByBillId,
    updateTransaction,
} from "../API/Manager";
import TransactionItems from "../components/Transactions/Items";
import { categories } from "../components/Transactions/Form/Category";
import DialogForm from "../components/Form/Dialog";
import ButtonAdd from "../components/ButtonAdd";
import MenuAppBar from "../components/AppBar";
import { billStore } from "../store/bill";

const emptyTransaction: ITransaction = {
    id: "",
    category: categories[0],
    amount: 0,
    date: dayjs(),
    comment: "",
    type: TransactionType.Expense,
    billId: "",
};

const TransactionPage = () => {
    const billId = billStore.bill.id;
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [transaction, setTransaction] =
        useState<ITransaction>(emptyTransaction);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    const handleGetTransactions = useCallback(async () => {
        getTxByBillId(billId).then((response) => {
            const data = response.data;
            if (data) {
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
            }
        });
    }, [billId]);

    const handleOpenForm = useCallback(() => {
        setIsFormOpen((prevState: boolean) => {
            if (prevState) {
                setTransaction(emptyTransaction);
            }
            return !prevState;
        });
    }, []);

    const handleAddTransaction = useCallback(
        async (transaction: ITransaction) => {
            createTransaction(transaction).then(handleGetTransactions);
            setTransaction(emptyTransaction);
        },
        [handleGetTransactions]
    );

    const handleUpdateTransaction = useCallback(
        async (transactionId: string, transaction: ITransaction) => {
            updateTransaction(transactionId, transaction).then(
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
        <Box sx={{ width: "100%", height: "100%" }}>
            <MenuAppBar>
                <ButtonAdd handleClick={handleOpenForm} />
            </MenuAppBar>
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
