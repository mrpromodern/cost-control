import { Box, Collapse } from "@mui/material";
import BillPage from "./Bill";
import TransactionPage from "./Transaction";
import { billStore } from "../store/bill";
import { groupBillStore } from "../store/groupBill";
import { observer } from "mobx-react-lite";

const MainPage = observer(() => {
    const isOpen = Boolean(billStore.bill.id || groupBillStore.groupBill.id);

    return (
        <Box display={"flex"} width={"100%"} height={"100vh"}>
            <BillPage />
            <Box sx={{ backgroundColor: "#f0f0f0", width: "100%" }}>
                <Collapse in={isOpen}>
                    <TransactionPage />
                </Collapse>
            </Box>
        </Box>
    );
});

export default MainPage;
