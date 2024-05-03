import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import dayjs, { Dayjs } from "dayjs";
import FormSum from "./Sum";
import FormCategory, { categories } from "./Category";
import FormDate from "./Date";
import FormComment from "./Comment";

const ExpenseForm = (props: any) => {
    const [selectedCategory, setSelectedCategory] = useState<string>(
        categories[0]
    );
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<Dayjs | null>(() => dayjs());
    const [comment, setComment] = useState<string>("");
    const theme = useTheme();

    const handleCategorySelect = (event: any) => {
        setSelectedCategory(event.target.value);
    };

    const handleAmountChange = (event: any) => {
        setAmount(event.target.value);
    };

    const handleCommentChange = (event: any) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.handleOpenForm();
        props.handleAddExpense({
            category: selectedCategory,
            amount: amount,
            comment: comment,
            date: date,
        });
    };

    return (
        <>
            <List
                sx={{
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    borderRadius: theme.shape.borderRadius,
                    maxWidth: 500,
                    padding: 0,
                }}
            >
                <FormSum handleAmountChange={handleAmountChange} />
                <FormCategory
                    category={selectedCategory}
                    handleCategorySelect={handleCategorySelect}
                />
                <FormDate date={date} setDate={setDate} />
                <FormComment handleCommentChange={handleCommentChange} />
                <ListItem>
                    <ListItemButton sx={{ padding: 0 }} onClick={handleSubmit}>
                        <ListItemText primary={"Сохранить операцию"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    );
};

export default ExpenseForm;
