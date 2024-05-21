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
import React from "react";

const drawerWidth = "15%";

interface IProps {
    toggleTheme: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
}

const Navbar = (props: IProps) => {
    const { toggleTheme, children } = props;

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
                        <ListItemButton>
                            <ListItemText primary="Операции" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            {children}
        </Box>
    );
};

export default Navbar;
