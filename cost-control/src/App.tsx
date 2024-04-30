import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ExpensesPage from "./components/Expenses/ExpensesPage";
import { createContext } from "react";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./styles/Theme";
import Button from "@mui/material/Button";

const ThemeContext = createContext({
    theme: lightTheme,
    toggleTheme: () => {},
});

function App() {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Button onClick={toggleTheme} variant="contained">
                    Смена темы
                </Button>
                <ExpensesPage />
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default App;
