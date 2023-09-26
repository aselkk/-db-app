import Box from "@mui/material/Box/Box";
import { DataDisplay } from "../../shared/components/DataDisplay";
import { InsertRow } from "../../shared/components/InsertRow";
import css from "./style.module.scss";

const InitialPage = () => {
  return (
    <Box className={css.container}>
      <Box className={css.wrapper}>
        <InsertRow />
        <DataDisplay />
      </Box>
    </Box>
  );
};

export default InitialPage;
