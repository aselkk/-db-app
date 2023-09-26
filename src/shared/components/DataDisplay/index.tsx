import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDataContext } from "../../../contexts/DataContext";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 110 },
  { field: "age", headerName: "Age", type: "number", width: 100 },
  {
    field: "subscriptionStatus",
    headerName: "Subscription Status",
    width: 160,
  },
  {
    field: "employed",
    headerName: "Employed",
    width: 120,
    valueGetter: (params) => (params.row.employed ? "Employed" : "Unemployed"),
  },
];

export const DataDisplay = () => {
  const { data, selectedRows, setSelectedRows } = useDataContext();

  const handleSelectionChange = (selection: any) => {
    setSelectedRows(selection);
  };

  return (
    <div>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={selectedRows}
        pageSizeOptions={[7, 10]}
        sx={{ border: 1, minHeight: "450px" }}
      />
    </div>
  );
};
