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
    type: "",
    price: "",
    hun: "",
    reward: "",
    image: "",
  });
  const [background, setBackground] = useState(null);
  const [backgroundSend, setBackgroundSend] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loadingSub, setLoadingSub] = useState(false);
  const [errors, setErrors] = useState({});

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}admin/card_type/delete/${
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
    setBackground(`${import.meta.env.VITE_API_URL_IMAGE}${item.image}`);
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

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    setBackgroundSend(file);
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoadingSub(true);
    console.log(backgroundSend);
    const formDataToSend = new FormData();

    formDataToSend.append("_method", "PUT");
    formDataToSend.append("card_type_id", editData.id);
    formDataToSend.append("type", editData.type);
    formDataToSend.append("price", editData.price);
    formDataToSend.append("hun", editData.hun);
    formDataToSend.append("reward", editData.reward);
    if (background && backgroundSend) {
      formDataToSend.append("image", backgroundSend);
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}admin/card_type/update`,
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
      alert("تأكد من تعبئة كل الحقول وحاول مرة أخرى");

      console.log(error);
    } finally {
      setLoadingSub(false);
    }
  };
  const handleBackgroundChange = (e) => {
    console.log("first");
    const file = e.target.files[0];
    setBackgroundSend(file);
    if (file) {
      setBackground(URL.createObjectURL(file));
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
          <td className="px-6 py-8 text-center">{item.type}</td>
          <td className="px-6 py-8 text-center">{item.price} SNC</td>
          <td className="px-6 py-8 text-center">{item.hun} SNC</td>
          <td className="px-6 py-8 text-center">{item.reward} SNC</td>
          <td className="px-6 py-8 text-center flex justify-center">
            <img
              src={`${import.meta.env.VITE_API_URL_IMAGE}${item.image}`}
              alt="no"
              className="w-52 h-24"
            />
          </td>
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
          <DialogContentText>
            {t("هل أنت متأكد أنك تريد حذف هذا العنصر")}
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

      {/* Dialog for editing */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("تعديل البطاقة")}</DialogTitle>
        <DialogContent>
          <div
            className={`logoImage h-52 flex items-center justify-center gap-5 w-full border border-[#BBBBBB] ${
              isDragging ? "bg-gray-300" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label
              htmlFor="background"
              className="w-full h-full cursor-pointer flex"
            >
              {background ? (
                <img
                  src={background}
                  alt="backgroundEvent"
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <div className="icon">📷</div>
                  <span className="text-[#275963] text-lg">
                    اسحب الصورة هنا أو تصفح الملفات
                  </span>
                </div>
              )}
              <input
                type="file"
                id="background"
                hidden
                onChange={handleBackgroundChange}
              />
            </label>
          </div>
          <TextField
            label={t("نوع البطاقة")}
            name="type"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.type}
          />
          <TextField
            label={t("السعر")}
            name="price"
            type="number"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.price}
          />
          <TextField
            label={t("العمولة")}
            name="hun"
            type="number"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.hun}
          />
          <TextField
            label={t("الجائزة")}
            name="reward"
            type="number"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.reward}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t("الغاء")}</Button>
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
