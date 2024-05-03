import Divider from "@mui/material/Divider";
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
                    sx={{ width: "100%" }}
                    placeholder="Примечание"
                    onChange={props.handleCommentChange}
                />
            </ListItem>
            <Divider component="li" />
        </>
    );
};
export default FormComment;
