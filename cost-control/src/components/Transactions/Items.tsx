import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Transaction } from "./type";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { useCallback } from "react";

type TransactionItemsProps = {
    transactions: Transaction[];
    handleOpenForm: Function;
    handleSetTransaction: (transaction: Transaction) => void;
};

const TransactionItems = (props: TransactionItemsProps) => {
    const theme = useTheme();
    const { transactions, handleOpenForm, handleSetTransaction } = props;

    const handleClick = useCallback(
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
            {transactions.map((transaction, index) => (
                <Box sx={{ padding: 1 }} key={index}>
                    <ListItemText
                        primary={`${transaction.date.format(
                            "dddd, D MMM YYYY"
                        )} г.`}
                    />
                    <Divider component="li" />
                    <ListItemButton
                        sx={{ padding: 0, minHeight: 50 }}
                        onClick={() => handleClick(transaction)}
                    >
                        <ListItemText primary={`${transaction.category}`} />
                        <ListItemText
                            sx={{ textAlign: "right" }}
                            primary={
                                <Box fontWeight="fontWeightMedium">
                                    - {transaction.amount} ₽
                                </Box>
                            }
                        />
                    </ListItemButton>
                    <Divider component="li" />
                </Box>
            ))}
        </List>
    );
};

export default TransactionItems;
