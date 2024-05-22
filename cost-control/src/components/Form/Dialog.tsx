import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";

interface IProps {
    title: string | React.ReactNode;
    isFormOpen: boolean;
    handleOpenForm: (event: React.MouseEvent) => void;
    children: React.ReactNode;
}

const DialogForm = (props: IProps) => {
    const theme = useTheme();
    const { title, isFormOpen, handleOpenForm, children } = props;

    return (
        <Dialog open={isFormOpen} onClose={handleOpenForm}>
            <DialogTitle sx={{textAlign: "center"}}>
                {title}
            </DialogTitle>
            <IconButton
                onClick={handleOpenForm}
                sx={{ position: "absolute", top: 8, right: 8 }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={{ paddingBottom: "12px" }}>
                <List
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRadius: theme.shape.borderRadius,
                        minWidth: 400,
                        padding: 0,
                        "& .MuiListItem-root": {
                            minHeight: "60px",
                            padding: 0,
                        },
                        "& .MuiListItemButton-root": {
                            minHeight: "60px",
                            padding: 0,
                        },
                    }}
                >
                    {children}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default DialogForm;
