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
    name: "",
    currency: "",
    lang: "",
    code: "",
    iso: "",
    tax: "",
    value_for_hun: "",
  });
  console.log(currentData);
  const [loadingSub, setLoadingSub] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}admin/country/delete/${
          itemToDelete.id
        }`,
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
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoadingSub(true);

    const formDataToSend = new FormData();
    formDataToSend.append("_method", "PUT");
    formDataToSend.append("country_id", editData.id); // تأكد من إرسال الـ ID دائمًا

    // مقارنة الحقول الأصلية بالمعدلة
    const originalItem = currentData.find((item) => item.id === editData.id);

    if (originalItem.name !== editData.name) {
      formDataToSend.append("name", editData.name);
    }
    if (originalItem.currency !== editData.currency) {
      formDataToSend.append("currency", editData.currency);
    }
    if (originalItem.lang !== editData.lang) {
      formDataToSend.append("lang", editData.lang);
    }
    if (originalItem.code !== editData.code) {
      formDataToSend.append("code", editData.code);
    }
    if (originalItem.iso !== editData.iso) {
      formDataToSend.append("iso", editData.iso);
    }
    if (originalItem.tax !== editData.tax) {
      formDataToSend.append("tax", editData.tax);
    }
    if (originalItem.value_for_hun !== editData.value_for_hun) {
      formDataToSend.append("value_for_hun", editData.value_for_hun);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}admin/country/update`,
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
          <td className="px-6 py-8 text-center">{item.currency}</td>
          <td className="px-6 py-8 text-center">{item.lang}</td>
          <td className="px-6 py-8 text-center">{item.code}</td>
          <td className="px-6 py-8 text-center">{item.iso}</td>
          <td className="px-6 py-8 text-center">{item.tax}</td>
          <td className="px-6 py-8 text-center">{item.value_for_hun}</td>
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

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>{t("تأكيد الحذف")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("هل أنت متأكد أنك تريد حذف هذا البلد؟")}
          </DialogContentText>
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("تعديل البلد")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("اسم البلد")}
            name="name"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.name}
          />
          <TextField
            label={t("العملة")}
            name="currency"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.currency}
          />
          <TextField
            label={t("اللغة")}
            name="lang"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.lang}
          />
          <TextField
            label={t("Code")}
            name="code"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.code}
          />
          <TextField
            label={t("ISO")}
            name="iso"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.iso}
          />
          <TextField
            label={t("الضريبة")}
            name="tax"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.tax}
          />
          <TextField
            label={t("العمولة")}
            name="value_for_hun"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.value_for_hun}
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
            {loadingSub ? <CircularProgress size={20} /> : t("حفظ")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
