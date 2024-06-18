import Button, { ButtonProps } from "@mui/material/Button";

type IProps = {
    onClick: (event: React.MouseEvent) => void;
    children: React.ReactNode;
} & Pick<ButtonProps, "color">;

const ButtonForm: React.FC<IProps> = ({ onClick, children, color }) => {
    return (
        <Button
            color="secondary"
            onClick={onClick}
            fullWidth
            variant="contained"
        >
            {children}
        </Button>
    );
};

export default ButtonForm;
