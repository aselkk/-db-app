import { RowData } from "../../types/rowData";

export const getLocalStorageData = () => {
  const data = localStorage.getItem("data");
  return data ? JSON.parse(data) : [];
};

export const insertRowInLocalStorage = (newRow: RowData) => {
  const data = getLocalStorageData();
  data.push(newRow);
  localStorage.setItem("data", JSON.stringify(data));
};

export const deleteRowInLocalStorage = (id: number | number[]) => {
  let data = getLocalStorageData();
  data = data.filter((row: RowData) => row.id !== id);
  localStorage.setItem("data", JSON.stringify(data));
};

export const editRowInLocalStorage = (id: number, updatedData: RowData) => {
  let data = getLocalStorageData();
  data = data.map((row: RowData) => (row.id === id ? updatedData : row));
  localStorage.setItem("data", JSON.stringify(data));
};
