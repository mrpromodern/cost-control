import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type FormDateProps = {
    date: Dayjs | null;
    setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
};

const FormDate = (props: FormDateProps) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const handleOpenCalendar = () => {
        setIsCalendarOpen((prevState) => !prevState);
    };

    return (
        <>
            <ListItem sx={{}}>
                <ListItemButton
                    sx={{ padding: 0 }}
                    onClick={handleOpenCalendar}
                >
                    <ListItemText>Дата</ListItemText>
                    <ListItemText sx={{ textAlign: "right" }}>
                        {props.date &&
                            props.date.format("DD MMM YYYY HH:mm:ss")}
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <Collapse in={isCalendarOpen}>
                <ListItem>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="ru"
                    >
                        <DemoContainer components={["DateCalendar"]}>
                            <DateCalendar
                                value={props.date}
                                onChange={(value) => {
                                    props.setDate(value);
                                    handleOpenCalendar();
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </ListItem>
            </Collapse>
            <Divider component="li" />
        </>
    );
};
export default FormDate;
