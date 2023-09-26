import InitialPage from "../pages/Initial";
import "./styles/null.scss";
import CssBaseline from "@mui/material/CssBaseline";
import { DarkModeProvider } from "../contexts/DarkModeContext";
import { DataProvider } from "../contexts/DataContext";

function App() {
  return (
    <DataProvider>
      <DarkModeProvider>
        <CssBaseline />
        <InitialPage />
      </DarkModeProvider>
    </DataProvider>
  );
}

export default App;
