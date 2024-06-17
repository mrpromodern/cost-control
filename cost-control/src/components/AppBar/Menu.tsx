import { Box } from "@mui/material";

interface IProps {
    children?: React.ReactNode;
}

const MenuAppBar: React.FC<IProps> = ({ children }) => {
    return (
        <Box
            ml={1}
            mr={1}
            sx={{ height: "50px" }}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
        >
            {children}
        </Box>
    );
};

export default MenuAppBar;
