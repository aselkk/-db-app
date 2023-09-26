import { createContext, useContext, useState, ReactNode } from "react";
import { RowData } from "../types/rowData";
import { getLocalStorageData } from "../common/services/localStorage";

interface DataContextType {
  data: RowData[];
  setData: (data: RowData[]) => void;
  selectedRows: number[];
  setSelectedRows: (rows: number[]) => void;
  editedRow: RowData | null;
  setEditedRow: (row: RowData | null) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(getLocalStorageData());
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [editedRow, setEditedRow] = useState<RowData | null>(null);

  const value = {
    data,
    setData,
    selectedRows,
    setSelectedRows,
    editedRow,
    setEditedRow,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
