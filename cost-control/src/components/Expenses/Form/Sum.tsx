import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

type FormSumProps = {
    handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormSum = (props: FormSumProps) => {
    return (
        <>
            <ListItem>
                <ListItemText>Сумма</ListItemText>
                <TextField
                    onChange={props.handleAmountChange}
                />
            </ListItem>
            <Divider component="li" />
        </>
    );
};

export default FormSum;
