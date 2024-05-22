import { Box } from "@mui/material";

interface IProps {
    children?: React.ReactNode;
}

const MenuAppBar = (props: IProps) => {
    const { children } = props;

    return (
        <Box sx={{ height: "50px" }} >
            {children}
        </Box>
    );
};

export default MenuAppBar;
