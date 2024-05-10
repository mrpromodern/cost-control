import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Transaction } from "./type";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { useCallback } from "react";

type TransactionItemsProps = {
    Transactions: Transaction[];
    handleOpenForm: Function;
    handleSetTransaction: (Transaction: Transaction) => void;
};

const TransactionItems = (props: TransactionItemsProps) => {
    const theme = useTheme();
    const { Transactions, handleOpenForm, handleSetTransaction } = props;

    const handleClick = useCallback(
        (Transaction: Transaction) => {
            handleSetTransaction(Transaction);
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
            {Transactions.map((Transaction, index) => (
                <Box sx={{ padding: 1 }} key={index}>
                    <ListItemText
                        primary={`${Transaction.date.format(
                            "dddd, D MMM YYYY"
                        )} г.`}
                    />
                    <Divider component="li" />
                    <ListItemButton
                        sx={{ padding: 0, minHeight: 50 }}
                        onClick={() => handleClick(Transaction)}
                    >
                        <ListItemText primary={`${Transaction.category}`} />
                        <ListItemText
                            sx={{ textAlign: "right" }}
                            primary={
                                <Box fontWeight="fontWeightMedium">
                                    - {Transaction.amount} ₽
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
