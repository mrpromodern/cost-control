import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";

type FormButtonProps = {
    onClick: (event: React.MouseEvent) => void;
    children: React.ReactNode;
    color?: "primary" | "error";
};

const FormButton = (props: FormButtonProps) => {
    const { onClick, children, color } = props;
    return (
        <ListItem>
            <Button
                onClick={onClick}
                sx={{ width: "100%" }}
                variant="contained"
                color={color}
            >
                {children}
            </Button>
        </ListItem>
    );
};

export default FormButton;
