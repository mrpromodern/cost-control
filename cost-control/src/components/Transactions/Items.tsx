import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { ITransaction } from "../../type";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { useCallback, useEffect } from "react";
import TransactionItem from "./Item";
import { Dayjs } from "dayjs";
import { tranStore } from "../../store/transaction";
import { observer } from "mobx-react-lite";

type TransactionItemsProps = {
    startDate: Dayjs;
    endDate: Dayjs;
    handleOpenForm: Function;
};

const isSameDay = (date1: Dayjs, date2: Dayjs) => {
    if (date1.format("D") === date2.format("D")) {
        if (date1.format("M") !== date2.format("M")) {
            return false;
        }
        return true;
    }
};

const TransactionItems = (props: TransactionItemsProps) => {
    const theme = useTheme();

    const { transactions, setTransaction, getTransactions, isLoading } =
        tranStore;
    const { startDate, endDate, handleOpenForm } = props;

    const handleClickTransaction = useCallback(
        (transaction: ITransaction) => {
            setTransaction(transaction);
            handleOpenForm();
        },
        [handleOpenForm, setTransaction]
    );

    useEffect(() => {
        getTransactions();
    }, [getTransactions]);

    return (
        <List
            sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius,
            }}
        >
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                transactions.map((transaction, index) => {
                    let show = false;
                    if (
                        transaction.date.isAfter(startDate) &&
                        transaction.date.isBefore(endDate)
                    ) {
                        show = true;
                    }

                    const prevTransaction = transactions[index - 1];
                    let showDate = true;

                    if (
                        prevTransaction &&
                        isSameDay(prevTransaction.date, transaction.date)
                    ) {
                        showDate = false;
                    }

                    return (
                        show && (
                            <Box
                                sx={{ padding: "0px 8px 0px 8px" }}
                                key={transaction.id}
                            >
                                {showDate && (
                                    <>
                                        <ListItemText
                                            sx={{ padding: "16px 0px 8px 0px" }}
                                            primary={`${transaction.date.format(
                                                "dddd, D MMM YYYY"
                                            )} г.`}
                                        />
                                        <Divider component="li" />
                                    </>
                                )}
                                <TransactionItem
                                    transaction={transaction}
                                    handleClickTransaction={
                                        handleClickTransaction
                                    }
                                />
                                <Divider component="li" />
                            </Box>
                        )
                    );
                })
            )}
        </List>
    );
};

export default observer(TransactionItems);
