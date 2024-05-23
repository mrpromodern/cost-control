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
import DialogForm from "../components/Form/Dialog";
import ButtonAdd from "../components/ButtonAdd";
import MenuAppBar from "../components/AppBar";
import { billStore } from "../store/bill";
import PanelGeneral from "../components/Transactions/General/Panel";
import { tranStore } from "../store/transaction";
import { observer } from "mobx-react-lite";

const TransactionPage = () => {
    const {
        transaction,
        setType: setTranType,
        setTransaction,
        resetTransaction,
    } = tranStore;

    const tranType = transaction.type;
    const billId: string = billStore.bill.id;
    
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    const handleClickTranType = useCallback(
        (
            event: React.MouseEvent<HTMLElement>,
            tranType: TransactionType
        ) => {
            setTranType(tranType);
            console.log(transaction);
             
        },
        [setTranType, transaction]
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
                resetTransaction();
            }
            return !prevState;
        });
    }, [resetTransaction]);

    const handleAddTransaction = useCallback(
        async (transaction: ITransaction) => {
            createTransaction(transaction).then(handleGetTransactions);
            resetTransaction();
        },
        [handleGetTransactions, resetTransaction]
    );

    const handleUpdateTransaction = useCallback(
        async (transactionId: string, transaction: ITransaction) => {
            updateTransaction(transactionId, transaction).then(
                handleGetTransactions
            );
            resetTransaction();
        },
        [handleGetTransactions, resetTransaction]
    );

    const handleDeleteTransaction = useCallback(
        async (transactionId: string) => {
            await deleteTransaction(transactionId).then(handleGetTransactions);
            resetTransaction();
        },
        [handleGetTransactions, resetTransaction]
    );

    const handleSetTransaction = useCallback(
        (transaction: ITransaction) => {
            setTransaction(transaction);
        },
        [setTransaction]
    );

    useEffect(() => {
        handleGetTransactions();
    }, [handleGetTransactions]);

    const DialogButtons = () => {
        return (
            <ToggleButtonGroup
                exclusive
                value={tranType}
                onChange={handleClickTranType}
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
                    handleOpenForm={handleOpenForm}
                    handleAddTransaction={handleAddTransaction}
                    handleUpdateTransaction={handleUpdateTransaction}
                    handleDeleteTransaction={handleDeleteTransaction}
                />
            </DialogForm>
        </Box>
    );
};

export default observer(TransactionPage);
