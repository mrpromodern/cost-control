import { useCallback, useState } from "react";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
    LocalizationProvider,
    StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type IDateFormProps = {
    date: Dayjs;
    setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

const DateForm = (props: IDateFormProps) => {
    const { date, setDate } = props;
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const handleClickDate = useCallback(() => {
        setIsCalendarOpen((prevState) => !prevState);
    }, []);

    const handleCloseCalendar = useCallback(() => {
        setIsCalendarOpen(false);
    }, []);

    return (
        <>
            <ListItemButton onClick={handleClickDate}>
                <ListItemText>Дата</ListItemText>
                <ListItemText sx={{ textAlign: "right" }}>
                    {date?.format("DD MMM YYYY HH:mm")}
                </ListItemText>
            </ListItemButton>
            <Collapse in={isCalendarOpen}>
                <ListItem sx={{ justifyContent: "center" }}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="ru"
                    >
                        <StaticDateTimePicker
                            value={date}
                            onChange={(value) => {
                                value && setDate(value);
                            }}
                            onAccept={handleCloseCalendar}
                            onClose={handleCloseCalendar}
                        />
                    </LocalizationProvider>
                </ListItem>
            </Collapse>
        </>
    );
};
export default DateForm;
