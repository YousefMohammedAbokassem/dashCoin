import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TableRow from "./TableRow";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import TableSkeleton from "../../../../../components/TableSkeleton";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";

const head = [
  { content: "sequence" },
  { content: "الاسم" },
  { content: "الشعار" },
  { content: "حذف او تعديل" },
];

export default function Categories() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [body, setBody] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [background, setBackground] = useState(null);
  const [backgroundSend, setBackgroundSend] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    setBackgroundSend(file);
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
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

  const [loadingSub, setLoadingSub] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    setLoadingSub(true);
    setErrors({});

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      if (background && backgroundSend) {
        formDataToSend.append("logo", backgroundSend);
      }
      
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}admin/market_category/add`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newItem = res.data.data;
      setBody((prevData) => [...prevData, newItem]);

      handleCloseDialog();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        dispatch(logoutUser());
      } else if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoadingSub(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}get_market_categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setBody(res.data?.data);
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <button
        onClick={handleOpenDialog}
        className="bg-[#275963] text-white px-4 py-2 rounded-md mb-4 mr-auto block w-full"
      >
        {t("إضافة فئة")}
      </button>
      {loading ? (
        <TableSkeleton />
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-[#1D1D1D] dark:text-[#fff]">
          <thead>
            <tr className="bg-[#fff] dark:bg-[#26292C] border-y dark:border-gray-700 border-gray-200">
              {head.map((item) => (
                <th
                  scope="col"
                  className="px-6 py-8 text-center"
                  key={item.content}
                >
                  {t(item.content)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TableRow
              currentData={body}
              fetchData={fetchData}
              setBody={setBody}
            />
          </tbody>
        </table>
      )}
      {/* Dialog MUI */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("إضافة فئة جديدة")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("اسم الفئة")}
            name="name"
            fullWidth
            margin="dense"
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name ? errors.name[0] : ""}
          />

          <div
            className={`logoImage h-52 flex items-center justify-center gap-5 w-full border border-[#BBBBBB] ${
              isDragging ? "bg-gray-300" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label htmlFor="background" className="w-full h-full cursor-pointer flex">
              {background ? (
                <img src={background} alt="categoryLogo" className="w-full h-full" />
              ) : (
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <div className="icon">📷</div>
                  <span className="text-[#275963] text-lg">اسحب الصورة هنا أو تصفح الملفات</span>
                </div>
              )}
              <input type="file" id="background" hidden onChange={handleBackgroundChange} />
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t("إلغاء")}</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" disabled={loadingSub}>
            {loadingSub ? <CircularProgress size={20} /> : t("إضافة")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}