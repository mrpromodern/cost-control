import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./styles/Theme";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Route, Routes } from "react-router-dom";
import MainPage from "./Pages/Main";
import Navbar from "./components/Navbar";
import Report from "./Pages/Report";
import { CssBaseline } from "@mui/material";

dayjs.locale("ru");

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Navbar>
                <Routes>
                    <Route
                        path="/cost-control-pages/transactions"
                        element={<MainPage />}
                    />
                    <Route
                        path="/cost-control-pages/reports"
                        element={<Report />}
                    />
                </Routes>
            </Navbar>
        </ThemeProvider>
    );
}

export default App;
