// InsertRow.jsx
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import css from "./style.module.scss";
import {
  deleteRowInLocalStorage,
  insertRowInLocalStorage,
  editRowInLocalStorage,
  getLocalStorageData,
} from "../../../common/services/localStorage";
import { useDarkMode } from "../../../contexts/DarkModeContext";
import { useDataContext } from "../../../contexts/DataContext";

export const InsertRow = () => {
  const { toggleDark, toggleDarkMode } = useDarkMode();
  const { data, setData, selectedRows, editedRow, setEditedRow } =
    useDataContext();

  useEffect(() => {
    if (editedRow) {
      const { name, age, subscriptionStatus, employed } = editedRow;
      setFormData({
        name: name || "",
        age: age || "",
        subscriptionStatus: subscriptionStatus || "Subscribed",
        employed: employed || false,
      });
    } else {
      setFormData({
        name: "",
        age: "",
        subscriptionStatus: "Subscribed",
        employed: false,
      });
    }
  }, [editedRow]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    subscriptionStatus: "Subscribed",
    employed: false,
  });

  const handleFieldChange = (field: string, value: string | boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    return formData.name !== "" && formData.age !== "";
  };

  const handleInsert = () => {
    if (isFormValid()) {
      if (selectedRows.length === 1) {
        const selectedRowId = selectedRows[0];
        editRowInLocalStorage(selectedRowId, {
          id: selectedRowId,
          name: formData.name,
          subscriptionStatus: formData.subscriptionStatus,
          employed: formData.employed,
          age: parseInt(formData.age),
        });
      } else {
        const newRow = {
          id: Date.now(),
          name: formData.name,
          subscriptionStatus: formData.subscriptionStatus,
          employed: formData.employed,
          age: parseInt(formData.age),
        };
        insertRowInLocalStorage(newRow);
      }

      const updatedData = getLocalStorageData();
      setData(updatedData);

      setEditedRow(null);
      setFormData({
        name: "",
        age: "",
        subscriptionStatus: "Subscribed",
        employed: false,
      });
    }
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0];
      const rowToEdit = data.find((row) => row.id === selectedRowId);

      editRowInLocalStorage(selectedRowId, {
        id: selectedRowId,
        name: formData.name,
        subscriptionStatus: formData.subscriptionStatus,
        employed: formData.employed,
        age: parseInt(formData.age),
      });

      const updatedData = getLocalStorageData();
      setData(updatedData);

      setEditedRow(null);
      setFormData({
        name: rowToEdit?.name || "",
        age: rowToEdit?.age || "",
        subscriptionStatus: rowToEdit?.subscriptionStatus || "Subscribed",
        employed: rowToEdit?.employed || false,
      });
    }
  };

  const handleDelete = () => {
    if (selectedRows.length > 0) {
      const newData = data.filter((row) => !selectedRows.includes(row.id));
      setData(newData);
      selectedRows.forEach((id) => {
        deleteRowInLocalStorage(id);
      });
    }
  };

  return (
    <Box sx={{ border: 1 }} className={css.container}>
      <FormGroup className={css.formGroup}>
        <TextField
          label="Name"
          variant="outlined"
          required
          value={formData.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />
        <TextField
          label="Age"
          type="number"
          required
          value={formData.age}
          onChange={(e) => handleFieldChange("age", e.target.value)}
        />
        <FormControl required>
          <Select
            value={formData.subscriptionStatus}
            onChange={(e) =>
              handleFieldChange("subscriptionStatus", e.target.value)
            }
          >
            <MenuItem value="Subscribed">Subscribed</MenuItem>
            <MenuItem value="Unsubscribed">Unsubscribed</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={formData.employed}
              onChange={(e) => handleFieldChange("employed", e.target.checked)}
              name="employed"
              color="default"
            />
          }
          label="Employed"
        />
        <Button
          variant="contained"
          onClick={handleInsert}
          disabled={!isFormValid()}
        >
          Insert
        </Button>
      </FormGroup>
      <Box className={css.formGroup}>
        <FormControlLabel
          control={
            <Switch
              checked={toggleDark}
              onChange={toggleDarkMode}
              name="toggleDark"
              color="default"
            />
          }
          label="Dark mode"
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            sx={{ width: 1 / 2 }}
            variant="contained"
            onClick={handleDelete}
            disabled={selectedRows.length == 0}
          >
            Delete
          </Button>
          <Button
            sx={{ width: 1 / 2 }}
            variant="contained"
            onClick={handleEdit}
            disabled={selectedRows.length !== 1}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
