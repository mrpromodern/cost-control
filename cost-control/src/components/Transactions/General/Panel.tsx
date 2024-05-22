import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemGeneral from "./Item";

const PanelGeneral = () => {
    return (
        <Box p={1}>
            <Grid container spacing={1}>
                <ItemGeneral
                    title="Доходы"
                    data="338 642,50 ₽"
                    colorData="success.main"
                />
                <ItemGeneral
                    title="Расходы"
                    data="338 642,50 ₽"
                    colorData="error.main"
                />
                <ItemGeneral
                    title="Баланс за период"
                    data="338 642,50 ₽"
                    colorData="success.main"
                />
                <ItemGeneral
                    title="Текущий остаток"
                    data="338 642,50 ₽"
                    colorData="success.main"
                />
            </Grid>
        </Box>
    );
};

export default PanelGeneral;
