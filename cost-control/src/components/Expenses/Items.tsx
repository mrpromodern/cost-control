import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Expense } from "./type";
import { useTheme } from "@mui/material/styles";

const ExpenseItems = (props: { expenses: Expense[] }) => {
    const theme = useTheme();

    return (
        <List
            sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius,
            }}
        >
            {props.expenses.map((expense, index) => {
                return (
                    <ListItem
                        key={index} // изменится на item.id после подключения бэка
                    >
                        <ListItemButton>
                            <ListItemText
                                primary={`Категория: ${expense.category} | Сумма: ${expense.amount} | Дата: ${expense.date} | Примечание: ${expense.comment}`}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default ExpenseItems;
