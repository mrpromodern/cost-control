import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { InputAdornment, styled } from "@mui/material";

type FormSumProps = {
    amount: number;
    handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormSum = (props: FormSumProps) => {
    return (
        <>
            <ListItem>
                <ListItemText>Сумма</ListItemText>
                <TextField
                    sx={{
                        input: {
                            textAlign: "right",
                        },
                    }}
                    type="number"
                    variant="standard"
                    value={props.amount}
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
                    onChange={props.handleAmountChange}
                />
            </ListItem>
            <Divider component="li" />
        </>
    );
};

export default FormSum;
