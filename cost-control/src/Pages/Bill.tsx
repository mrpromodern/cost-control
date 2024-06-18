import List from "@mui/material/List";
import { useCallback, useEffect, useState } from "react";
import {
    Box,
    Divider,
    Grow,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircle";
import AddClickIcon from "@mui/icons-material/AddCircleTwoTone";
import GroupBillItem from "../components/Bills/GroupBill";
import DialogForm from "../components/Form/Dialog";
import GroupBillForm from "../components/Bills/GroupForm";
import ButtonAdd from "../components/ButtonAdd";
import BillForm from "../components/Bills/BillForm";
import MenuAppBar from "../components/AppBar/Menu";
import { billStore } from "../store/bill";
import { groupBillStore } from "../store/groupBill";
import { observer } from "mobx-react-lite";
import CreateIcon from "@mui/icons-material/Create";

const BillPage = () => {
    const { groupBills, fetchGroupBills, resetGroupBill } = groupBillStore;
    const { resetBill } = billStore;
    const [openBillForm, setOpenBillForm] = useState<boolean>(false);
    const [openGroupForm, setOpenGroupForm] = useState<boolean>(false);
    const [anchorE1, setAnchorE1] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorE1);

    const handleOpenGroupForm = useCallback(() => {
        setAnchorE1(null);
        setOpenGroupForm((prevState: boolean) => {
            if (prevState) {
                resetGroupBill();
            }

            return !prevState;
        });
    }, [resetGroupBill]);

    const handleOpenBillForm = useCallback(() => {
        setAnchorE1(null);
        setOpenBillForm((prevState: boolean) => {
            if (prevState) {
                resetBill();
            }

            return !prevState;
        });
    }, [resetBill]);

    const handleClickAdd = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorE1(event.currentTarget);
        },
        []
    );

    const handleClickEdit = useCallback(() => {
        handleOpenBillForm();
    }, [handleOpenBillForm]);

    const handleCloseMenu = useCallback(() => {
        setAnchorE1(null);
    }, []);

    useEffect(() => {
        fetchGroupBills();
    }, [fetchGroupBills]);

    return (
        <Box width={"40%"} sx={{ backgroundColor: "#eaeaec" }}>
            <MenuAppBar>
                <IconButton onClick={handleClickAdd}>
                    {anchorE1 === null ? <AddIcon /> : <AddClickIcon />}
                </IconButton>
                <Typography fontWeight="bold">Счета</Typography>
                <IconButton onClick={handleClickEdit}>
                    <CreateIcon />
                </IconButton>
            </MenuAppBar>
            <Box ml={1} mr={1}>
                <List>
                    {groupBills.map((groupBill) => {
                        return (
                            <GroupBillItem
                                key={groupBill.id}
                                groupBill={groupBill}
                            />
                        );
                    })}
                </List>

                <Menu
                    sx={{
                        "& .MuiMenu-paper": {
                            borderRadius: 2,
                        },
                    }}
                    anchorEl={anchorE1}
                    open={open}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={handleOpenGroupForm}>
                        Создать группу счетов
                    </MenuItem>
                    <Box>
                        <Divider />
                    </Box>
                    <MenuItem onClick={handleOpenBillForm}>
                        Создать счет
                    </MenuItem>
                </Menu>
                <DialogForm
                    title="Группа счетов"
                    isFormOpen={openGroupForm}
                    handleOpenForm={handleOpenGroupForm}
                >
                    <GroupBillForm handleOpenForm={handleOpenGroupForm} />
                </DialogForm>
                <DialogForm
                    title="Счет"
                    isFormOpen={openBillForm}
                    handleOpenForm={handleOpenBillForm}
                >
                    <BillForm
                        groupBills={groupBills}
                        handleOpenForm={handleOpenBillForm}
                    />
                </DialogForm>
            </Box>
        </Box>
    );
};

export default observer(BillPage);
