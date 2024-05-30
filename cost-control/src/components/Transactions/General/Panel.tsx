import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemGeneral from "./Item";
import { tranStore } from "../../../store/transaction";
import { observer } from "mobx-react-lite";

const PanelGeneral = () => {
    const { income, expense, balance, current } = tranStore;

    return (
        <Box p={1}>
            <Grid container spacing={1}>
                <ItemGeneral
                    title="Доходы"
                    data={Math.abs(income)}
                    colorData="success.main"
                />
                <ItemGeneral
                    title="Расходы"
                    data={Math.abs(expense)}
                    colorData="error.main"
                />
                <ItemGeneral
                    title="Баланс за период"
                    data={Math.abs(balance)}
                    colorData={balance < 0 ? "error.main" : "success.main"}
                />
                <ItemGeneral
                    title="Текущий остаток"
                    data={Math.abs(current)}
                    colorData={current < 0 ? "error.main" : "success.main"}
                />
            </Grid>
        </Box>
    );
};

export default observer(PanelGeneral);
