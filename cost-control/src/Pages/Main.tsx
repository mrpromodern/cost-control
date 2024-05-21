import { Divider } from "@mui/material";
import BillPage from "./Bill";
import TransactionPage from "./Transaction";
import { billStore } from "../store/bill";
import { observer } from "mobx-react-lite";

const MainPage = observer(() => {
    return (
        <>
            <BillPage />
            {billStore.bill.id === "" ? (
                <></>
            ) : (
                <>
                    <Divider orientation="vertical" sx={{ height: "100vh" }} />
                    <TransactionPage />
                </>
            )}
        </>
    );
});

export default MainPage;
