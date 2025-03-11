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
  { content: "الفئة" },
  { content: "العنوان" },
  { content: "فعال" },
  { content: "حظر" },
];

export default function Events() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [body, setBody] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSub, setLoadingSub] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    market_category: "",
    address: "",
  });
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    if (file) {
      setLogo(URL.createObjectURL(file));
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
    setLogoFile(file);
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoadingSub(true);
    setErrors({});

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("market_category", formData.market_category);
      formDataToSend.append("address", formData.address);
      if (logoFile) {
        formDataToSend.append("logo", logoFile);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}admin/events/add`,
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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}admin/get_events`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setBody(res.data?.data?.data);
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
        className="bg-[#275963] text-white px-4 py-2 rounded-md mb-4 w-full"
      >
        {t("إضافة حدث")}
      </button>
      {loading ? (
        <TableSkeleton />
      ) : (
        <table className="w-full text-sm text-center text-[#1D1D1D] dark:text-[#fff]">
          <thead>
            <tr className="bg-[#fff] dark:bg-[#26292C] border-y dark:border-gray-700 border-gray-200">
              {head.map((item) => (
                <th className="px-6 py-8" key={item.content}>
                  {t(item.content)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TableRow currentData={body} fetchData={fetchData} setBody={setBody} />
          </tbody>
        </table>
      )}

      {/* Dialog MUI */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("إضافة حدث جديد")}</DialogTitle>
        <DialogContent>
          <TextField label={t("اسم الحدث")} name="name" fullWidth margin="dense" onChange={handleChange} />
          <TextField label={t("الفئة")} name="market_category" fullWidth margin="dense" onChange={handleChange} />
          <TextField label={t("العنوان")} name="address" fullWidth margin="dense" onChange={handleChange} />
          <input type="file" id="logo" hidden onChange={handleLogoChange} />
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