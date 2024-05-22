import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ITransaction, TransactionType } from "../../type";

type TransactionItemProps = {
    transaction: ITransaction;
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
                    // проверка типа, отрицательное значение или нет
                    transaction.type === TransactionType.Expense ? (
                        <Box fontWeight="fontWeightMedium">
                            - {transaction.amount} ₽
                        </Box>
                    ) : (
                        <Box color="green" fontWeight="fontWeightMedium">
                            + {transaction.amount} ₽
                        </Box>
                    )
                }
            />
        </ListItemButton>
    );
};

export default TransactionItem;
