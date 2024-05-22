import { Collapse, Divider } from "@mui/material";
import BillPage from "./Bill";
import TransactionPage from "./Transaction";
import { billStore } from "../store/bill";
import { observer } from "mobx-react-lite";

const MainPage = observer(() => {
    const open = billStore.bill.id === "" ? false : true;

    return (
        <>
            <BillPage />
                <Divider orientation="vertical" sx={{ height: "100vh" }} />
            <Collapse sx={{width: "100%"}} in={open}>
                <TransactionPage />
            </Collapse>
        </>
    );
});

export default MainPage;
