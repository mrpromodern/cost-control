import { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { tranStore } from "../store/transaction";
import { PieChart } from "@mui/x-charts/PieChart";
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { TransactionType } from "../type";
import MenuAppBar from "../components/AppBar/Menu";
import PeriodAppBar from "../components/AppBar/Period";

const Chart = observer(() => {
    const { type, setType, dataChart } = tranStore;
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

    const handleChangeType = useCallback(
        (event: SelectChangeEvent) => {
            setType(event.target.value as TransactionType);
        },
        [setType]
    );

    useEffect(() => {
        const updateDimensions = () => {
            if (chartContainerRef.current) {
                const width = chartContainerRef.current.offsetWidth;
                const height = width * 0.5; // Высота 50% от ширины
                setDimensions({ width, height });
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    return (
        <Box>
            <MenuAppBar>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select value={type} onChange={handleChangeType}>
                            <MenuItem value={TransactionType.Expense}>
                                Расходы
                            </MenuItem>
                            <MenuItem value={TransactionType.Income}>
                                Доходы
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <PeriodAppBar />
                </Box>
            </MenuAppBar>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
                sx={{ width: "100%", maxWidth: "100%", height: "40vh" }} // 50% высоты экрана
            >
                <PieChart
                    series={[
                        {
                            paddingAngle: 3,
                            innerRadius: "50%",
                            outerRadius: "100%",
                            data: dataChart,
                        },
                    ]}
                    margin={{ right: 5 }}
                    width={dimensions.width}
                    height={dimensions.height}
                    legend={{ hidden: true }}
                />
            </Box>
        </Box>
    );
});

export default Chart;
