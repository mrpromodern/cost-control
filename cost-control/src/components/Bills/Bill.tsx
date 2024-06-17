import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { IBill } from "../../type";
import { useCallback } from "react";
import { billStore } from "../../store/bill";
import { groupBillStore } from "../../store/groupBill";
import { observer } from "mobx-react-lite";
import { tranStore } from "../../store/transaction";
import { ListItem } from "@mui/material";

interface IProps {
    bill: IBill;
}

const Bill: React.FC<IProps> = observer(({ bill }) => {
    const { getTransactions, updateGeneral, getCategoryChart } = tranStore;
    const isPlusNumber = bill.balance === 0 ? false : bill.balance > 0;
    const color = isPlusNumber ? "secondary" : "";

    const handleClick = useCallback(() => {
        billStore.setBill(bill);
        groupBillStore.resetGroupBill();
        getTransactions()
            .then(() => updateGeneral())
            .then(() => getCategoryChart());
    }, [bill, getCategoryChart, getTransactions, updateGeneral]);

    return (
        <ListItem
            sx={{
                p: 0,
            }}
        >
            <ListItemButton
                sx={{ borderRadius: 2 }}
                selected={billStore.bill.id === bill.id}
                onClick={handleClick}
            >
                <ListItemText primary={bill.name} />
                <ListItemText
                    sx={{ textAlign: "right" }}
                    primary={`${isPlusNumber ? "+" : "-"} ${Math.abs(
                        bill.balance
                    )} ₽`}
                    primaryTypographyProps={{
                        color: color,
                        fontWeight: "fontWeightMedium",
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
});

export default Bill;
