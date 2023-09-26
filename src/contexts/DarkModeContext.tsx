import { createContext, useState, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const DarkModeContext = createContext({
  toggleDark: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toggleDark, setToggleDark] = useState(true);

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [theme, setTheme] = useState(toggleDark ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(toggleDark ? darkTheme : lightTheme);
  }, [toggleDark]);

  const toggleDarkMode = () => {
    setToggleDark(!toggleDark);
  };

  return (
    <DarkModeContext.Provider value={{ toggleDark, toggleDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
};
