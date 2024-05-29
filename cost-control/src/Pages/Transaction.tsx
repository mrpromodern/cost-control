import { useCallback, useEffect, useState } from "react";
import TransactionForm from "../components/Transactions/Form/Form";
import { ITransaction, TransactionType } from "../type";
import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import {
    createTransaction,
    deleteTransaction,
    getTxByBillId,
    getTxByGroupBillId,
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
import PeriodGeneral from "../components/Transactions/Period";
import { groupBillStore } from "../store/groupBill";

const TransactionPage = () => {
    const {
        transaction,
        setType: setTranType,
        setTransaction,
        resetTransaction,
    } = tranStore;

    const tranType: TransactionType = transaction.type;

    const billId: string = billStore.bill.id;
    const groupBillId: string = groupBillStore.groupBill.id;

    const [startDate, setMinDate] = useState(dayjs().startOf("month"));
    const [endDate, setMaxDate] = useState(dayjs().endOf("month"));
    const [dateFormOpen, setDateFormOpen] = useState<boolean>(false);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    // ------------- Date -------------

    const handleOpenDateForm = useCallback(() => {
        setDateFormOpen((prevState: boolean) => !prevState);
    }, []);

    const handleChangePeriod = useCallback((minDate: Dayjs, maxDate: Dayjs) => {
        setMinDate(minDate);
        setMaxDate(maxDate);
    }, []);

    // ------------- Transaction -------------

    const handleClickTranType = useCallback(
        (event: React.MouseEvent<HTMLElement>, tranType: TransactionType) => {
            setTranType(tranType);
            console.log(transaction);
        },
        [setTranType, transaction]
    );

    const handleSetTransactions = useCallback((data: any) => {
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
    }, []);

    const handleGetTransactions = useCallback(async () => {
        if (billId) {
            getTxByBillId(billId).then((response) => {
                handleSetTransactions(response.data);
            });
        } else if (groupBillId) {
            getTxByGroupBillId(groupBillId).then((response) => {
                handleSetTransactions(response.data);
            });
        }
    }, [billId, groupBillId, handleSetTransactions]);

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
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <ButtonAdd handleClick={handleOpenForm} />
                    <Button color="info" onClick={handleOpenDateForm}>
                        <Typography variant="h6">
                            {startDate.format("DD.MM.YYYY")} -{" "}
                            {endDate.format("DD.MM.YYYY")}
                        </Typography>
                    </Button>
                </Box>
            </MenuAppBar>
            <PanelGeneral startDate={startDate} endDate={endDate} />
            <TransactionItems
                startDate={startDate}
                endDate={endDate}
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
            <DialogForm
                title="Период"
                isFormOpen={dateFormOpen}
                handleOpenForm={handleOpenDateForm}
            >
                <PeriodGeneral
                    minDate={startDate}
                    maxDate={endDate}
                    handleChangePeriod={handleChangePeriod}
                    handleOpenDateForm={handleOpenDateForm}
                />
            </DialogForm>
        </Box>
    );
};

export default observer(TransactionPage);
