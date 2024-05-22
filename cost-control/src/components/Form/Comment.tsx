import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

interface FormCommentProps {
    value: string;
    title: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommentForm = (props: FormCommentProps) => {
    const { value, title, handleChange } = props;

    return (
        <>
            <ListItem>
                <TextField
                    value={value}
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
