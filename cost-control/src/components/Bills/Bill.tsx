import ListItemButton from "@mui/material/ListItemButton";
import RemoveIcon from "@mui/icons-material/Remove";
import ListItemText from "@mui/material/ListItemText";
import { IBill } from "../../type";
import { useCallback } from "react";
import { billStore } from "../../store/bill";

interface IProps {
    bill: IBill;
}

const Bill = (props: IProps) => {
    const { bill } = props;

    const handleClick = useCallback(() => {
        billStore.setBill(bill);
    }, [bill]);

    return (
        <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
            <RemoveIcon fontSize="small" />
            <ListItemText primary={bill.name} />
        </ListItemButton>
    );
};

export default Bill;
