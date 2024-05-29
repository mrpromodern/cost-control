import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import { DateRange } from "react-date-range";
import { ru } from "date-fns/locale";
import type { RangeKeyDict } from "react-date-range";
import { Box } from "@mui/material";
import ButtonForm from "../Form/Button";

interface IProps {
    minDate: Dayjs;
    maxDate: Dayjs;
    handleChangePeriod: (minDate: Dayjs, maxDate: Dayjs) => void;
    handleOpenDateForm: () => void;
}

interface IDateRange {
    startDate?: Date;
    endDate?: Date;
    key?: string;
}

const PeriodGeneral = (props: IProps) => {
    const { minDate, maxDate, handleChangePeriod, handleOpenDateForm } = props;

    const [range, setRange] = useState<IDateRange[]>([
        {
            startDate: minDate.toDate(),
            endDate: maxDate.toDate(),
            key: "selection",
        },
    ]);

    const handleSetRange = useCallback(
        (range: RangeKeyDict) => {
            const selection = range.selection;
            if (selection.startDate && selection.endDate) {
                setRange([selection]);

                handleChangePeriod(
                    dayjs(selection.startDate),
                    dayjs(selection.endDate)
                );
            }
        },
        [handleChangePeriod]
    );

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center">
                <DateRange
                    editableDateInputs={true}
                    locale={ru}
                    onChange={handleSetRange}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                />
            </Box>
            <ButtonForm onClick={handleOpenDateForm} color="error">
                Закрыть
            </ButtonForm>
        </>
    );
};

export default PeriodGeneral;
