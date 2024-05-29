import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemGeneral from "./Item";
import { useCallback, useEffect } from "react";
import { Dayjs } from "dayjs";
import { billStore } from "../../../store/bill";
import {
    getBalanceByBillId,
    getBalanceByGroupBillId,
    getCurrentBalanceByBillId,
    getCurrentBalanceByGroupBillId,
    getExpensesByBillId,
    getExpensesByGroupBillId,
    getIncomeByBillId,
    getIncomeByGroupBillId,
} from "../../../API/Manager";
import { groupBillStore } from "../../../store/groupBill";
import {
    incomeStore,
    expenseStore,
    balanceStore,
    currentStore,
} from "../../../store/general";

interface IProps {
    startDate: Dayjs;
    endDate: Dayjs;
}

const PanelGeneral = (props: IProps) => {
    const { startDate, endDate } = props;

    const { income, setIncome } = incomeStore;
    const { expense, setExpense } = expenseStore;
    const { balance, setBalance } = balanceStore;
    const { current, setCurrent } = currentStore;

    const billId = billStore.bill.id;
    const groupBillId = groupBillStore.groupBill.id;

    const handleGetIncome = useCallback(() => {
        if (billId) {
            getIncomeByBillId(
                billId,
                startDate.toString(),
                endDate.toString()
            ).then((response) => {
                setIncome(response.data);
            });
        } else if (groupBillId) {
            getIncomeByGroupBillId(
                groupBillId,
                startDate.toString(),
                endDate.toString()
            ).then((response) => {
                setIncome(response.data);
            });
        }
    }, [billId, endDate, groupBillId, setIncome, startDate]);

    const handleGetExpense = useCallback(() => {
        if (billId) {
            getExpensesByBillId(
                billId,
                startDate.toString(),
                endDate.toString()
            ).then((response) => {
                setExpense(response.data);
            });
        } else if (groupBillId) {
            getExpensesByGroupBillId(
                groupBillId,
                startDate.toString(),
                endDate.toString()
            ).then((response) => {
                setExpense(response.data);
            });
        }
    }, [billId, endDate, groupBillId, setExpense, startDate]);

    const handleGetBalance = useCallback(() => {
        if (billId) {
            getBalanceByBillId(
                billId,
                startDate.toString(),
                endDate.toString()
            ).then((response) => {
                setBalance(response.data);
            });
        } else if (groupBillId) {
            getBalanceByGroupBillId(
                groupBillId,
                startDate.toString(),
                endDate.toString()
            ).then((response) => {
                setBalance(response.data);
            });
        }
    }, [billId, endDate, groupBillId, setBalance, startDate]);

    const handleGetCurrentBalance = useCallback(() => {
        if (billId) {
            getCurrentBalanceByBillId(billId).then((response) => {
                setCurrent(response.data);
            });
        } else if (groupBillId) {
            getCurrentBalanceByGroupBillId(groupBillId).then((response) => {
                setCurrent(response.data);
            });
        }
    }, [billId, groupBillId, setCurrent]);

    useEffect(() => {
        handleGetIncome();
        handleGetExpense();
        handleGetBalance();
        handleGetCurrentBalance();
    }, [
        handleGetIncome,
        handleGetExpense,
        handleGetBalance,
        handleGetCurrentBalance,
    ]);

    return (
        <Box p={1}>
            <Grid container spacing={1}>
                <ItemGeneral
                    title="Доходы"
                    data={Math.abs(income)}
                    colorData="success.main"
                />
                <ItemGeneral
                    title="Расходы"
                    data={Math.abs(expense)}
                    colorData="error.main"
                />
                <ItemGeneral
                    title="Баланс за период"
                    data={Math.abs(balance)}
                    colorData={balance < 0 ? "error.main" : "success.main"}
                />
                <ItemGeneral
                    title="Текущий остаток"
                    data={Math.abs(current)}
                    colorData={current < 0 ? "error.main" : "success.main"}
                />
            </Grid>
        </Box>
    );
};

export default PanelGeneral;
