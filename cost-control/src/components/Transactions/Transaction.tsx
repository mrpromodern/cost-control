import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Transaction } from "../../type";

type TransactionItemProps = {
    transaction: Transaction;
    handleClickTransaction: Function;
};

const TransactionItem = (props: TransactionItemProps) => {
    const { transaction, handleClickTransaction } = props;

    return (
        <ListItemButton
            sx={{ padding: 0, minHeight: 50 }}
            onClick={() => handleClickTransaction(transaction)}
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
    );
};

export default TransactionItem;
