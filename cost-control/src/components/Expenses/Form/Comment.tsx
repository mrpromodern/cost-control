import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

type FormCommentProps = {
    handleCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormComment = (props: FormCommentProps) => {
    return (
        <>
            <ListItem>
                <TextField
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    sx={{ width: "100%" }}
                    onChange={props.handleCommentChange}
                    placeholder="Примечание"
                />
            </ListItem>
            <Divider component="li" />
        </>
    );
};
export default FormComment;
