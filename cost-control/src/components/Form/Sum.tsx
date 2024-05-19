import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";

interface FormSumProps {
    title: string;
    amount: number;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SumForm = (props: FormSumProps) => {
    const { title, amount, handleChange } = props;

    return (
        <ListItem>
            <ListItemText>{title}</ListItemText>
            <TextField
                sx={{
                    input: {
                        textAlign: "right",
                    },
                }}
                type="number"
                variant="standard"
                value={amount}
                InputProps={{
                    endAdornment: (
                        <InputAdornment
                            sx={{ paddingLeft: 1 }}
                            position="start"
                        >
                            ₽
                        </InputAdornment>
                    ),
                    disableUnderline: true,
                }}
                onChange={handleChange}
            />
        </ListItem>
    );
};

export default SumForm;
