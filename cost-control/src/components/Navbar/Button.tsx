import { ListItem, ListItemButton, ListItemText } from "@mui/material";

interface IProps {
    children: React.ReactNode;
    text: string;
    handleClick: () => void;
}

const ButtonNavbar: React.FC<IProps> = ({ children, text, handleClick }) => {
    return (
        <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: 2 }} onClick={handleClick}>
                {children}
                &nbsp;
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    );
};

export default ButtonNavbar;
