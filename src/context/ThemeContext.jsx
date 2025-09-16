import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", JSON.stringify(newTheme));
            console.log(`saved ${newTheme}`);
            return newTheme;
        });
    };
    
    const defaultTheme = () => {
        const startTheme = JSON.parse(localStorage.getItem("theme"));
        setTheme(startTheme);
        document.documentElement.setAttribute("data-theme", startTheme);
        // return startTheme;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme,toggleTheme, defaultTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
