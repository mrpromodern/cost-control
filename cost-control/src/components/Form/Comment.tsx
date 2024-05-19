import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

interface FormCommentProps {
    title: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommentForm = (props: FormCommentProps) => {
    const { title, handleChange } = props;

    return (
        <>
            <ListItem>
                <TextField
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                    placeholder={title}
                />
            </ListItem>
        </>
    );
};
export default CommentForm;
