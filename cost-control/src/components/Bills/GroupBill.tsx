import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useCallback, useState } from "react";
import { IGroupBill } from "../../type";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Bill from "./Bill";

interface IProps {
    groupBill: IGroupBill;
}

const GroupBillItem = (props: IProps) => {
    const { groupBill } = props;

    const [open, setOpen] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        setOpen((prevState) => !prevState);
    }, []);

    return (
        <>
            <ListItemButton onClick={handleClick}>
                {open ? <ExpandLess /> : <ExpandMore />}
                <ListItemText primary={groupBill.name} />
            </ListItemButton>
            <Collapse in={open}>
                <List component="div" disablePadding>
                    {groupBill.bills.map((bill) => (
                        <Bill bill={bill} />
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export default GroupBillItem;
