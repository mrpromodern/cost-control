import ListItemButton from "@mui/material/ListItemButton";
import RemoveIcon from "@mui/icons-material/Remove";
import ListItemText from "@mui/material/ListItemText";
import { IBill } from "../../type";

interface IProps {
    bill: IBill;
}

const Bill = (props: IProps) => {
    const { bill } = props;

    return (
        <ListItemButton sx={{ pl: 4 }}>
            <RemoveIcon fontSize="small" />
            <ListItemText primary={bill.name} />
        </ListItemButton>
    );
};

export default Bill;
