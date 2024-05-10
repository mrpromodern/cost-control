import { useCallback, useState } from "react";
import TransactionForm from "./Form/Form";
import { Transaction, TransactionType } from "./type";
import TransactionItems from "./Items";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import { categories } from "./Form/Category";
import dayjs from "dayjs";


const emptyTransaction: Transaction = {
    id: "",
    category: categories[0],
    amount: 0,
    date: dayjs(),
    comment: "",
    type: TransactionType.Expense,
};

const TransactionPage = () => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [Transactions, setTransactions] = useState<Transaction[]>([]);
    const [Transaction, setTransaction] = useState<Transaction>(emptyTransaction);

    const handleOpenForm = useCallback(() => {
        setIsFormOpen((prevState: boolean) => !prevState);
    }, []);

    const handleAddTransactions = useCallback((Transaction: Transaction) => {
        setTransactions((prevState: Transaction[]) => [...prevState, Transaction]);
    }, []);

    const handleUpdateTransactions = useCallback(
        (TransactionId: string, newTransaction: Transaction) => {
            const newTransactions: Transaction[] = [...Transactions];
            const TransactionIndex: number = newTransactions.findIndex(
                (value) => TransactionId === value.id
            );

            newTransactions[TransactionIndex] = newTransaction;

            setTransactions(newTransactions);
            setTransaction(emptyTransaction);
        },
        [Transactions]
    );

    const handleSetTransaction = useCallback((Transaction: Transaction) => {
        setTransaction(Transaction);
    }, []);

    return (
        <Box>
            <IconButton onClick={handleOpenForm}>
                <AddIcon />
            </IconButton>
            <Dialog open={isFormOpen} onClose={handleOpenForm}>
                <DialogTitle>Расход</DialogTitle>
                <IconButton
                    onClick={handleOpenForm}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ paddingBottom: "12px" }}>
                    <TransactionForm
                        Transaction={Transaction}
                        handleOpenForm={handleOpenForm}
                        handleAddTransaction={handleAddTransactions}
                        handleUpdateTransaction={handleUpdateTransactions}
                    />
                </DialogContent>
            </Dialog>
            <TransactionItems
                Transactions={Transactions}
                handleOpenForm={handleOpenForm}
                handleSetTransaction={handleSetTransaction}
            />
        </Box>
    );
};

export default TransactionPage;
