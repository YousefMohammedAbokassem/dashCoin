import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillEdit } from "react-icons/ai";
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
  const [editData, setEditData] = useState({
    method: "_PUT",
    key: "",
    value: "",
  });
  const [loadingSub, setLoadingSub] = useState(false);
  const [errors, setErrors] = useState({});

  const onEdit = (item) => {
    setEditData(item);
    setOpenDialog(true);
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
    formDataToSend.append("value_commission_id", editData.id);
    formDataToSend.append("key", editData.key);
    formDataToSend.append("value", editData.value);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}admin/value_commission/update`,
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
          <td className="px-6 py-8 text-center">{t(item.key)}</td>
          <td className="px-6 py-8 text-center">{item.value}%</td>
          <td className="px-6 py-8 text-center">
            <button
              onClick={() => onEdit(item)}
              className="text-blue-500 hover:text-blue-700 mx-2"
            >
              <AiFillEdit size={20} />
            </button>
          </td>
        </tr>
      ))}

      {/* Dialog for editing commission */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("Edit Commission")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("Key")}
            name="key"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.key}
          />
          <TextField
            label={t("Value")}
            name="value"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.value}
          />
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
