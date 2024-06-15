import {
    Box,
    Collapse,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { IGroupBill } from "../../type";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Bill from "./Bill";
import { billStore } from "../../store/bill";
import { groupBillStore } from "../../store/groupBill";
import { tranStore } from "../../store/transaction";
import { observer } from "mobx-react-lite";

interface IProps {
    groupBill: IGroupBill;
}

const GroupBillItem: React.FC<IProps> = observer(({ groupBill }) => {
    const activeGroupBillId = groupBillStore.groupBill.id;
    const { getTransactions, updateGeneral, getCategoryChart } = tranStore;

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const savedState = localStorage.getItem(
            `groupBill-${groupBill.id}-open`
        );
        setOpen(savedState ? JSON.parse(savedState) : false);
    }, [groupBill.id]);

    const handleClick = useCallback(async () => {
        groupBillStore.setGroupBill(groupBill);
        billStore.resetBill();
        await getTransactions();
        updateGeneral();
        await getCategoryChart();
    }, [getCategoryChart, getTransactions, groupBill, updateGeneral]);

    const handleCollapse = useCallback(() => {
        setOpen((prevState) => {
            const newState = !prevState;
            localStorage.setItem(
                `groupBill-${groupBill.id}-open`,
                JSON.stringify(newState)
            );
            return newState;
        });
    }, [groupBill.id]);

    return (
        <Box m={1}>
            <ListItem
                sx={{
                    p: 0,
                }}
                secondaryAction={
                    <IconButton onClick={handleCollapse}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                }
            >
                <ListItemButton
                    sx={{ borderRadius: 2 }}
                    onClick={handleClick}
                    disableTouchRipple
                    selected={activeGroupBillId === groupBill.id}
                >
                    <ListItemText
                        primary={groupBill.name}
                        primaryTypographyProps={{ fontWeight: "bold" }}
                    />
                </ListItemButton>
            </ListItem>
            <Collapse in={open}>
                {groupBill.bills.map((bill) => (
                    <Bill key={bill.id} bill={bill} />
                ))}
            </Collapse>
        </Box>
    );
});

export default GroupBillItem;
