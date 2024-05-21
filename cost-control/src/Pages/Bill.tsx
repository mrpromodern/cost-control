import List from "@mui/material/List";
import { useCallback, useEffect, useState } from "react";
import { IBill, IGroupBill } from "../type";
import { createBill, createGroupBill, getGroupBills } from "../API/Manager";
import { Box, Menu, MenuItem } from "@mui/material";
import GroupBillItem from "../components/Bills/GroupBill";
import DialogForm from "../components/Form/Dialog";
import GroupBillForm from "../components/Bills/GroupForm";
import ButtonAdd from "../components/ButtonAdd";
import BillForm from "../components/Bills/BillForm";
import MenuAppBar from "../components/AppBar";

const BillPage = () => {
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
            setGroupBills(response.data);
        });
    }, []);

    const handleAddGroup = useCallback(
        async (groupBill: IGroupBill) => {
            createGroupBill(groupBill).then(handleGetGroups);
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

    // ------------- ---- -------------

    const handleClickMenu = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorE1(event.currentTarget);
        },
        []
    );

    const handleCloseMenu = useCallback(() => {
        setAnchorE1(null);
    }, []);

    useEffect(() => {
        handleGetGroups();
    }, [handleGetGroups]);

    return (
        <Box sx={{ width: "33%", height: "100%" }}>
            <MenuAppBar>
                <ButtonAdd handleClick={handleClickMenu} />
            </MenuAppBar>
            <Menu anchorEl={anchorE1} open={open} onClose={handleCloseMenu}>
                <MenuItem onClick={handleOpenGroupForm}>
                    Создать группу счетов
                </MenuItem>
                <MenuItem onClick={handleOpenBillForm}>Создать счет</MenuItem>
            </Menu>
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
                    groupBills={groupBills}
                    handleAddBill={handleAddBill}
                    handleOpenForm={handleOpenBillForm}
                />
            </DialogForm>
        </Box>
    );
};

export default BillPage;
