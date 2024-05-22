import { useCallback, useEffect, useState } from "react";
import TransactionForm from "../components/Transactions/Form/Form";
import { ITransaction, TransactionType } from "../type";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
import PanelGeneral from "../components/Transactions/General/Panel";

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
    const [transactionType, setTransactionType] = useState<TransactionType>(
        TransactionType.Expense
    );

    const handleClickTransType = useCallback(
        (
            event: React.MouseEvent<HTMLElement>,
            transType: TransactionType.Expense
        ) => {
            setTransactionType(transType);
            setTransaction((prevState) => {
                prevState.type = transType;
                return prevState;
            });
        },
        []
    );

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

    const DialogButtons = () => {
        return (
            <ToggleButtonGroup
                exclusive
                value={transactionType}
                onChange={handleClickTransType}
            >
                <ToggleButton value={TransactionType.Income}>
                    Доход
                </ToggleButton>
                <ToggleButton value={TransactionType.Expense}>
                    Расход
                </ToggleButton>
            </ToggleButtonGroup>
        );
    };

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <MenuAppBar>
                <ButtonAdd handleClick={handleOpenForm} />
            </MenuAppBar>
            <PanelGeneral />
            <TransactionItems
                transactions={transactions}
                handleOpenForm={handleOpenForm}
                handleSetTransaction={handleSetTransaction}
            />
            <DialogForm
                title={<DialogButtons />}
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
        </Box>
    );
};

export default TransactionPage;
