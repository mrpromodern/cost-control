import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuAppBar from "./AppBar";
import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { exportData, importData } from "../API/Manager";
import { groupBillStore } from "../store/groupBill";
import { observer } from "mobx-react-lite";
import ListIcon from '@mui/icons-material/FormatListBulletedRounded';
import SendIcon from '@mui/icons-material/SendToMobileRounded';
import InstallIcon from '@mui/icons-material/InstallMobileRounded';

interface IProps {
    toggleTheme: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
}

const Navbar = (props: IProps) => {
    const { toggleTheme, children } = props;

    const drawerWidth = "15%";

    const handleImport = useCallback(async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.onchange = (event: Event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target?.result as string);
                        importData(data).then(() =>
                            groupBillStore.fetchGroupBills()
                        );
                    } catch (error) {
                        console.error("Failed to parse JSON:", error);
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                anchor="left"
                variant="permanent"
            >
                <MenuAppBar>
                    <Button variant="text" onClick={toggleTheme}>
                        Тема
                    </Button>
                </MenuAppBar>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to="/cost-control-pages/transactions"
                        >
                            <ListIcon/> 
                            <ListItemText primary="&nbsp;Операции" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem />
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleImport}>
                            <InstallIcon/>
                            <ListItemText primary="&nbsp;Импорт" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={exportData}>
                            <SendIcon/>
                            <ListItemText primary="&nbsp;Экспорт" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            {children}
        </Box>
    );
};

export default observer(Navbar);
