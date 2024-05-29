import ListItemButton from "@mui/material/ListItemButton";
import RemoveIcon from "@mui/icons-material/Remove";
import ListItemText from "@mui/material/ListItemText";
import { IBill } from "../../type";
import { useCallback } from "react";
import { billStore } from "../../store/bill";
import { groupBillStore } from "../../store/groupBill";

interface IProps {
    bill: IBill;
}

const Bill = (props: IProps) => {
    const activeBillId = billStore.bill.id;

    const { bill } = props;

    const handleClick = useCallback(() => {
        billStore.setBill(bill);
        groupBillStore.resetGroupBill();
    }, [bill]);

    return (
        <ListItemButton
            selected={activeBillId === bill.id}
            sx={{ pl: 4 }}
            onClick={handleClick}
        >
            <RemoveIcon fontSize="small" />
            <ListItemText primary={bill.name} />
            <ListItemText
                sx={{ textAlign: "right" }}
                primary={`${bill.balance} ₽`}
            />
        </ListItemButton>
    );
};

export default Bill;
