import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TransactionPage from "./Components/Transactions/Page";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./styles/Theme";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Route, Routes } from "react-router-dom";

dayjs.locale("ru");

function App() {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return (
        <ThemeProvider theme={theme}>
            <Button onClick={toggleTheme} variant="contained">
                Смена темы
            </Button>
            <Routes>
                <Route path="/" element={<TransactionPage />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
