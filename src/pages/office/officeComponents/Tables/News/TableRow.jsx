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
} from "@mui/material";

export default function TableRow({ currentData, fetchData, setBody }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editData, setEditData] = useState({
    method: "_PUT",
    title: "",
    color_code: "",
    text: "",
  });
  const [loadingSub, setLoadingSub] = useState(false);
  const [errors, setErrors] = useState({});

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}admin/update/delete/${itemToDelete.id}`,
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

  const onEdit = (item) => {
    setEditData(item);
    setOpenDialog(true);
  };

  const handleDialogOpen = (item) => {
    setItemToDelete(item);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setItemToDelete(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoadingSub(true);
    const formDataToSend = new FormData();

    formDataToSend.append("_method", "PUT");
    formDataToSend.append("update_id", editData.id);
    formDataToSend.append("title", editData.title);
    formDataToSend.append("color_code", editData.color_code);
    formDataToSend.append("text", editData.text);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}admin/update/update`,
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
          <td className="px-6 py-8 text-center">{item.title}</td>
          <td className="px-6 py-8 text-center">{item.date}</td>
          <td
            className={`px-6 py-8 text-center`}
            style={{ backgroundColor: item.color_code, color: "white" }}
          >
            {item.color_code}
          </td>
          <td className="px-6 py-8 text-center">{item.text}</td>
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
        <DialogTitle>{t("تأكيد الحذف")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("هل أنت متأكد أنك تزيد حذف هذا الخبر")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>{t("لا")}</Button>
          <Button
            onClick={onDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : t("نعم")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for editing */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("Edit Update")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("Title")}
            name="title"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.title}
          />
          <TextField
            label={t("Text")}
            name="text"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.text}
            multiline
            rows={4}
          />
          {/* Color Picker for color_code */}
          <TextField
            label={t("Color Code")}
            name="color_code"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.color_code}
            InputProps={{
              inputComponent: "input",
              inputProps: {
                type: "color", // This is the color picker input
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t("إلغاء")}</Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loadingSub}
          >
            {loadingSub ? <CircularProgress size={20} /> : t("تعديل")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
