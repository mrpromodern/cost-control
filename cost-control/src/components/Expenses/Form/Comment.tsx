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
        </>
    );
};
export default FormComment;
