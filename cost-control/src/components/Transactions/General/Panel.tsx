import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemGeneral from "./Item";
import { tranStore } from "../../../store/transaction";
import { observer } from "mobx-react-lite";

const PanelGeneral = observer(() => {
    const { income, expense, balance, current } = tranStore;

    const items = [
        { title: "Доходы", data: income, colorData: "secondary.main" },
        { title: "Расходы", data: expense, colorData: "error.main" },
        {
            title: "Баланс за период",
            data: balance,
            colorData: balance < 0 ? "error.main" : "secondary.main",
        },
        {
            title: "Текущий остаток",
            data: current,
            colorData: current < 0 ? "error.main" : "secondary.main",
        },
    ];

    return (
        <Box m={1}>
            <Grid container spacing={1}>
                {items.map((item, index) => (
                    <ItemGeneral
                        key={index}
                        title={item.title}
                        data={Math.abs(item.data)}
                        colorData={item.colorData}
                    />
                ))}
            </Grid>
        </Box>
    );
});

export default PanelGeneral;
