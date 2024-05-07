import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import dayjs, { Dayjs } from "dayjs";
import FormSum from "./Sum";
import FormCategory, { categories } from "./Category";
import FormDate from "./Date";
import FormComment from "./Comment";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

const ExpenseForm = (props: any) => {
    const [selectedCategory, setSelectedCategory] = useState<string>(
        categories[0]
    );
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<Dayjs | null>(() => dayjs());
    const [comment, setComment] = useState<string>("");
    const theme = useTheme();

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setAmount(value);
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
        <List
            sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius,
                minWidth: 400,
                padding: 0,
                "& .MuiListItem-root": {
                    minHeight: "60px",
                    padding: 0,
                },
                "& .MuiListItemButton-root": {
                    minHeight: "60px",
                    padding: 0,
                },
            }}
        >
            <Divider component="li" />

            <FormSum amount={amount} handleAmountChange={handleAmountChange} />

            <Divider component="li" />

            <FormCategory
                category={selectedCategory}
                handleCategorySelect={handleCategoryChange}
            />

            <Divider component="li" />

            <FormDate date={date} setDate={setDate} />

            <Divider component="li" />

            <FormComment handleCommentChange={handleCommentChange} />

            <Divider component="li" />

            <ListItem>
                <Button
                    onClick={handleSubmit}
                    sx={{ width: "100%" }}
                    variant="contained"
                >
                    Сохранить операцию
                </Button>
            </ListItem>
        </List>
    );
};

export default ExpenseForm;
