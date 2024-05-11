import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Transaction } from "./type";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getTransactions } from "../../API/API";

type TransactionItemsProps = {
    Transactions: Transaction[];
    handleOpenForm: Function;
    handleSetTransaction: (Transaction: Transaction) => void;
};

const TransactionItems = (props: TransactionItemsProps) => {
    const theme = useTheme();
    const { Transactions, handleOpenForm, handleSetTransaction } = props;
    const [trans, setTrans] = useState<Transaction[]>([]);

    const handleClick = useCallback(
        (Transaction: Transaction) => {
            handleSetTransaction(Transaction);
            handleOpenForm();
        },
        [handleOpenForm, handleSetTransaction]
    );

    useEffect(() => {
        getTransactions().then((response) => {
            if (response) {
                setTrans(response.data);
            }
        });
    }, []);

    return (
        <List
            sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius,
            }}
        >
            {trans.map((transaction, index) => (
                <Box sx={{ padding: 1 }} key={index}>
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
            {Transactions.map((transaction, index) => (
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
