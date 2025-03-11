import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

export default function TableRow({ currentData, fetchData, setBody, countries }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editData, setEditData] = useState({
    method: "_PUT",
    name: "",
    country_id: "",
  });
  const [loadingSub, setLoadingSub] = useState(false);

  // Handle Delete
  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}admin/city/delete/${itemToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setBody((prevData) =>
        prevData.filter((item) => item.id !== itemToDelete.id)
      );
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit
  const onEdit = (item) => {
    setEditData(item);
    setOpenDialog(true);
  };

  // Handle open delete confirmation dialog
  const handleDialogOpen = (item) => {
    setItemToDelete(item);
    setOpen(true);
  };

  // Handle close delete confirmation dialog
  const handleDialogClose = () => {
    setOpen(false);
    setItemToDelete(null);
  };

  // Handle close edit dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle change in form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Handle submit edit form
  const handleSubmit = async () => {
    setLoadingSub(true);
    const formDataToSend = new FormData();

    formDataToSend.append("_method", "PUT");
    formDataToSend.append("city_id", editData.id);
    formDataToSend.append("name", editData.name);
    formDataToSend.append("country_id", editData.country_id);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}admin/city/update`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setOpenDialog(false);
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSub(false);
    }
  };

  return (
    <>
      {currentData?.map((item, i) => (
        <tr
          key={i}
          className="odd:bg-[#E1E2E3] even:bg-[#fff] border-b border-gray-200 hover:bg-[#D1D2D3]"
        >
          <td className="px-6 py-8 text-center">{i + 1}</td>
          <td className="px-6 py-8 text-center">{item.name}</td>
          <td className="px-6 py-8 text-center">
            <button
              onClick={() => onEdit(item)}
              className="text-blue-500 hover:text-blue-700 mx-2"
            >
              <AiFillEdit size={20} />
            </button>
            <button
              onClick={() => handleDialogOpen(item)}
              className="text-red-500 hover:text-red-700"
            >
              <AiFillDelete size={20} />
            </button>
          </td>
        </tr>
      ))}

      {/* Dialog for delete confirmation */}
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>{t("Confirm Deletion")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Are you sure you want to delete this city?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>{t("No")}</Button>
          <Button
            onClick={onDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : t("Yes")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for editing */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("Edit City")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("City Name")}
            name="name"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.name}
          />
          <Select
            label={t("Country")}
            name="country_id"
            value={editData.country_id}
            onChange={handleChange}
            fullWidth
            margin="dense"
          >
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t("Cancel")}</Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loadingSub}
          >
            {loadingSub ? <CircularProgress size={20} /> : t("Save")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
