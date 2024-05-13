import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { Transaction } from "./type";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { useCallback } from "react";
import TransactionItem from "./Transaction";

type TransactionItemsProps = {
    transactions: Transaction[];
    handleOpenForm: Function;
    handleSetTransaction: (transaction: Transaction) => void;
};

const TransactionItems = (props: TransactionItemsProps) => {
    const theme = useTheme();
    const { transactions, handleOpenForm, handleSetTransaction } = props;

    const handleClickTransaction = useCallback(
        (transaction: Transaction) => {
            handleSetTransaction(transaction);
            handleOpenForm();
        },
        [handleOpenForm, handleSetTransaction]
    );

    return (
        <List
            sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius,
            }}
        >
            {transactions.map((transaction, index) => {
                const prevTransaction = transactions[index - 1];
                let showDate = true;

                if (prevTransaction) {
                    const prevDateDay = prevTransaction.date.format("D");
                    const dateDay = transaction.date.format("D");

                    if (prevDateDay === dateDay) {
                        showDate = false;
                    }
                }

                return (
                    <Box sx={{ padding: "0px 8px 0px 8px"}} key={transaction.id}>
                        {showDate && (
                            <>
                                <ListItemText
                                sx={{padding: "16px 0px 8px 0px"}}
                                    primary={`${transaction.date.format(
                                        "dddd, D MMM YYYY"
                                    )} г.`}
                                />
                                <Divider component="li" />
                            </>
                        )}
                        <TransactionItem
                            transaction={transaction}
                            handleClickTransaction={handleClickTransaction}
                        />
                        <Divider component="li" />
                    </Box>
                );
            })}
        </List>
    );
};

export default TransactionItems;
