import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import TargetPage from "./Target";

const PlanPage = () => {
    return (
        <Box
            sx={{ backgroundColor: "#f0f0f0" }}
            display={"flex"}
            width={"100%"}
            height={"100vh"}
        >
            <Box sx={{ backgroundColor: "#f0f0f0", width: "100%" }}>
                <TargetPage />
            </Box>
        </Box>
    );
};

export default observer(PlanPage);
