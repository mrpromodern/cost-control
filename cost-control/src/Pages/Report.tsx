import { Collapse, Divider } from "@mui/material";
import BillPage from "./Bill";
import { billStore } from "../store/bill";
import { groupBillStore } from "../store/groupBill";
import { observer } from "mobx-react-lite";
import Chart from "./Chart";

const MainPage = () => {
    const open =
        billStore.bill.id === "" && groupBillStore.groupBill.id === ""
            ? false
            : true;

    return (
        <>
            <BillPage />
            <Divider orientation="vertical" sx={{ height: "100vh" }} />
            <Collapse sx={{ width: "100%" }} in={open}>
                <Chart />
            </Collapse>
        </>
    );
};

export default observer(MainPage);
