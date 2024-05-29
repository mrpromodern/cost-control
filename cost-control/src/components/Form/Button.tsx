import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";

type FormButtonProps = {
    onClick: (event: React.MouseEvent) => void;
    children: React.ReactNode;
    color?: "primary" | "error";
};

const ButtonForm = (props: FormButtonProps) => {
    const { onClick, children, color } = props;
    return (
        <ListItem>
            <Button
                onClick={onClick}
                fullWidth
                variant="contained"
                color={color}
            >
                {children}
            </Button>
        </ListItem>
    );
};

export default ButtonForm;
