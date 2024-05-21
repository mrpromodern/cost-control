import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./styles/Theme";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Route, Routes } from "react-router-dom";
import MainPage from "./Pages/Main";
import Navbar from "./components/Navbar";

dayjs.locale("ru");

function App() {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return (
        <ThemeProvider theme={theme}>
            <Navbar toggleTheme={toggleTheme}>
                <Routes>
                    <Route path="/cost-control-pages" element={<MainPage />} />
                </Routes>
            </Navbar>
        </ThemeProvider>
    );
}

export default App;
