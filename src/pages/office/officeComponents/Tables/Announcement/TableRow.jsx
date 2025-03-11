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
  const [editData, setEditData] = useState({});
  const [image, setImage] = useState(null);
  const [imageSend, setImageSend] = useState(null);
  const [loadingSub, setLoadingSub] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}admin/announcement/delete/${
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

  const handleEdit = (item) => {
    setEditData(item);
    setImage(`${import.meta.env.VITE_API_URL_IMAGE}${item.image}`);
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
    setImageSend(file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageSend(file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoadingSub(true);
    const formDataToSend = new FormData();
    console.log(editData)
    formDataToSend.append("_method", "PUT");
    formDataToSend.append("announcement_id", editData.id);
    formDataToSend.append("title", editData.title);
    if (image && imageSend) {
      formDataToSend.append("image", imageSend);
    }
    console.log(formDataToSend);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}admin/announcement/update`,
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
          <td className="px-6 py-8 text-center">
            <img
              src={`${import.meta.env.VITE_API_URL_IMAGE}${item.image}`}
              alt={item.title}
              className="w-52 h-24"
            />
          </td>
          <td className="px-6 py-8 text-center">{item.date}</td>
          <td className="px-6 py-8 text-center">
            <button
              onClick={() => handleEdit(item)}
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
            {t("هل أنت متأكد من حذف هذا الإعلان؟")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>{t("إلغاء")}</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : t("نعم")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("تعديل الإعلان")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("عنوان الإعلان")}
            name="title"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={editData.title}
          />

          <div
            className={`w-full h-52 flex items-center justify-center gap-5 border border-[#BBBBBB] ${
              isDragging ? "bg-gray-300" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label
              htmlFor="editImage"
              className="cursor-pointer block w-full h-full"
            >
              {image ? (
                <img
                  src={image}
                  alt="announcementImage"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="icon">📷</div>
                  <span className="text-[#275963] text-lg">
                    {t("اسحب الصورة هنا أو تصفح الملفات")}
                  </span>
                </div>
              )}
              <input
                type="file"
                id="editImage"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>
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
