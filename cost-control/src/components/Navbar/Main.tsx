import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuAppBar from "../AppBar/Menu";
import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { exportData, importData } from "../../API/Manager";
import { groupBillStore } from "../../store/groupBill";
import { observer } from "mobx-react-lite";
import ListIcon from "@mui/icons-material/FormatListBulletedRounded";
import SendIcon from "@mui/icons-material/SendToMobileRounded";
import InstallIcon from "@mui/icons-material/InstallMobileRounded";
import PieChartIcon from "@mui/icons-material/PieChartRounded";
import ArticleIcon from "@mui/icons-material/ArticleRounded";
import { generateTransactions } from "../../Mocks/Models/Transaction";
import CreateIcon from "@mui/icons-material/CreateNewFolderRounded";
import ButtonNavbar from "./Button";

interface IProps {
    children?: React.ReactNode;
}

const navItems = [
    {
        path: "/cost-control-pages/transactions",
        icon: <ListIcon color="secondary" />,
        text: "Операции",
    },
    {
        path: "/cost-control-pages/reports",
        icon: <PieChartIcon color="secondary" />,
        text: "Отчёт",
    },
    {
        path: "/cost-control-pages/plans",
        icon: <ArticleIcon color="secondary" />,
        text: "План",
    },
];

const Navbar: React.FC<IProps> = observer(({ children }) => {
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

    const handleGenerate = useCallback(() => {
        generateTransactions();
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
                PaperProps={{
                    sx: {
                        backgroundColor: "#dcdcdc",
                        borderRight: "0px",
                    },
                }}
            >
                <MenuAppBar />
                <Box ml={1} mr={1}>
                    <List>
                        {navItems.map((item) => (
                            <ListItem disablePadding key={item.path}>
                                <ListItemButton
                                    component={NavLink}
                                    to={item.path}
                                    sx={{
                                        borderRadius: 2,
                                        "&.active": {
                                            backgroundColor: "#bfbfbf",
                                        },
                                    }}
                                >
                                    {item.icon}
                                    &nbsp;
                                    <ListItemText primary={`${item.text}`} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem />
                        <ButtonNavbar text="Импорт" handleClick={handleImport}>
                            <InstallIcon color="secondary" />
                        </ButtonNavbar>
                        <ButtonNavbar text="Экспорт" handleClick={exportData}>
                            <SendIcon color="secondary" />
                        </ButtonNavbar>
                        <ListItem />
                        <ButtonNavbar
                            text="Генерация"
                            handleClick={handleGenerate}
                        >
                            <CreateIcon color="secondary" />
                        </ButtonNavbar>
                    </List>
                </Box>
            </Drawer>
            {children}
        </Box>
    );
});

export default Navbar;
