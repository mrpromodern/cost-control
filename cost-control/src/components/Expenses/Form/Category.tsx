import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export const categories = [
    "Без категории",
    "Продукты",
    "Рестораны и кафе",
    "Транспорт",
    "Жилье",
    "Коммунальные услуги",
    "Одежда и аксессуары",
    "Здоровье и красота",
    "Развлечения",
    "Путешествия",
    "Образование",
    "Подарки",
];

type FormCategoryProps = {
    category: string;
    handleCategorySelect: (category: string) => void;
};

const FormCategory = (props: FormCategoryProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ListItem>
                <ListItemButton onClick={() => setOpen(true)}>
                    <ListItemText primary="Категория" />
                    <ListItemText
                        sx={{ textAlign: "right" }}
                        primary={props.category}
                    />
                </ListItemButton>
            </ListItem>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: "center" }}>
                    Категория
                </DialogTitle>
                <IconButton
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <List sx={{ minWidth: 400 }}>
                        {categories.map((category) => (
                            <ListItemButton
                                key={category}
                                onClick={() => {
                                    handleClose();
                                    props.handleCategorySelect(category);
                                }}
                            >
                                <ListItemText primary={category} />
                            </ListItemButton>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FormCategory;
