import List from "@mui/material/List";
import { useCallback, useEffect, useState } from "react";
import { IBill, IGroupBill } from "../type";
import {
    createBill,
    createGroupBill,
    getGroupBills,
    updateBill,
} from "../API/Manager";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import GroupBillItem from "../components/Bills/GroupBill";
import DialogForm from "../components/Form/Dialog";
import GroupBillForm from "../components/Bills/GroupForm";
import ButtonAdd from "../components/ButtonAdd";
import BillForm from "../components/Bills/BillForm";
import MenuAppBar from "../components/AppBar";
import DensityIcon from "@mui/icons-material/DensityMediumRounded";
import { billStore } from "../store/bill";

const emptyBill: IBill = {
    id: "",
    groupBillId: "",
    name: "",
    balance: 0,
};

const BillPage = () => {
    const [bill, setBill] = useState<IBill>(emptyBill);
    const [groupBills, setGroupBills] = useState<IGroupBill[]>([]);
    const [openBillForm, setOpenBillForm] = useState<boolean>(false);
    const [openGroupForm, setOpenGroupForm] = useState<boolean>(false);
    const [anchorE1, setAnchorE1] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorE1);

    // ------------- Group Bill -------------

    const handleOpenGroupForm = useCallback(() => {
        setAnchorE1(null);
        setOpenGroupForm((prevState: boolean) => !prevState);
    }, []);

    const handleGetGroups = useCallback(async () => {
        getGroupBills().then((response) => {
            const data = response.data;
            setGroupBills(data);
        });
    }, []);

    const handleAddGroup = useCallback(
        async (groupBill: IGroupBill) => {
            await createGroupBill(groupBill)
            handleGetGroups();
        },
        [handleGetGroups]
    );

    // ------------- Bill -------------

    const handleOpenBillForm = useCallback(() => {
        setAnchorE1(null);
        setOpenBillForm((prevState: boolean) => !prevState);
    }, []);

    const handleAddBill = useCallback(
        async (bill: IBill) => {
            createBill(bill).then(handleGetGroups);
        },
        [handleGetGroups]
    );

    const handleUpdateBill = useCallback(
        async (id: string, bill: IBill) => {
            await updateBill(id, bill)
            handleGetGroups();
        },
        [handleGetGroups]
    );

    // ------------- ---- -------------

    const handleClickAdd = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorE1(event.currentTarget);
        },
        []
    );

    const handleClickEdit = useCallback(() => {
        const newBill = billStore.bill;
        setBill(newBill);
        handleOpenBillForm();
    }, [handleOpenBillForm]);

    const handleCloseMenu = useCallback(() => {
        setAnchorE1(null);
    }, []);

    useEffect(() => {
        handleGetGroups();
    }, [handleGetGroups]);

    return (
        <Box sx={{ width: "33%", height: "100%" }}>
            <MenuAppBar>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <ButtonAdd handleClick={handleClickAdd} />
                    <Typography>Счет</Typography>
                    <IconButton disabled={billStore.bill.id === ""} onClick={handleClickEdit}>
                        <DensityIcon />
                    </IconButton>
                </Box>
            </MenuAppBar>
            <List component="nav">
                {groupBills.map((groupBill) => {
                    return (
                        <GroupBillItem
                            key={groupBill.id}
                            groupBill={groupBill}
                        />
                    );
                })}
            </List>
            <Menu anchorEl={anchorE1} open={open} onClose={handleCloseMenu}>
                <MenuItem onClick={handleOpenGroupForm}>
                    Создать группу счетов
                </MenuItem>
                <MenuItem onClick={handleOpenBillForm}>Создать счет</MenuItem>
            </Menu>
            <DialogForm
                title="Группа счетов"
                isFormOpen={openGroupForm}
                handleOpenForm={handleOpenGroupForm}
            >
                <GroupBillForm
                    handleAddGroup={handleAddGroup}
                    handleOpenForm={handleOpenGroupForm}
                />
            </DialogForm>
            <DialogForm 
                title="Счет"
                isFormOpen={openBillForm}
                handleOpenForm={handleOpenBillForm}
            >
                <BillForm
                    bill={bill}
                    groupBills={groupBills}
                    handleAddBill={handleAddBill}
                    handleUpdateBill={handleUpdateBill}
                    handleOpenForm={handleOpenBillForm}
                />
            </DialogForm>
        </Box>
    );
};

export default BillPage;
