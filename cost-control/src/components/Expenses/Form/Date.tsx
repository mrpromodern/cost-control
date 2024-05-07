import { useState } from "react";
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

type FormDateProps = {
    date: Dayjs | null;
    setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
};

const FormDate = (props: FormDateProps) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const handleClickDate = () => {
        setIsCalendarOpen((prevState) => !prevState);
    };

    const handleCloseCalendar = () => {
        setIsCalendarOpen(false);
    };

    return (
        <>
            <ListItemButton onClick={handleClickDate}>
                <ListItemText>Дата</ListItemText>
                <ListItemText sx={{ textAlign: "right" }}>
                    {props.date?.format("DD MMM YYYY HH:mm")}
                </ListItemText>
            </ListItemButton>
            <Collapse in={isCalendarOpen}>
                <ListItem sx={{ justifyContent: "center" }}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="ru"
                    >
                        <StaticDateTimePicker
                            value={props.date}
                            onChange={(value) => {
                                props.setDate(value);
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
export default FormDate;
