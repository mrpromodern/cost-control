import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Expense } from "./type";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";

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
            {props.expenses.map((expense, index) => (
                <Box sx={{ padding: 1 }} key={index}>
                    <ListItemText primary={`${expense.date}`} />
                    <Divider component="li" />
                    <ListItemButton sx={{ padding: 0, minHeight: 50 }}>
                        <ListItemText primary={`${expense.category}`} />
                        <ListItemText
                            sx={{ textAlign: "right" }}
                            primary={
                                <Box fontWeight="fontWeightMedium">
                                    - {expense.amount} ₽
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

export default ExpenseItems;
