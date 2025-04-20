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
  { content: "العملة" },
  { content: "اللغة" },
  { content: "الكود" },
  { content: "ISO" },
  { content: "الضريبة" },
  { content: "العمولة" },
  { content: "الإجراءات" },
];

const formDataKeys = {
  name: "اسم البلد",
  currency: "العملة",
  lang: "اللغة",
  code: "الكود",
  iso: "ISO",
  tax: "الضريبة",
  value_for_hun: "العمولة",
};

export default function Countries() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [body, setBody] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    currency: "",
    lang: "",
    code: "",
    iso: "",
    tax: "",
    value_for_hun: "",
    flag: "/snc.png",
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [loadingSub, setLoadingSub] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    setLoadingSub(true);
    setErrors({});
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}admin/country/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newItem = res.data.data;
      setBody((prevData) => [...prevData, newItem]);
      handleCloseDialog();
      setFormData({
        // إعادة تعيين النموذج بعد الإرسال
        name: "",
        currency: "",
        lang: "",
        code: "",
        iso: "",
        tax: "",
        value_for_hun: "",
      });
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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}countries`, {
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
        {t("إضافة دولة")}
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("إضافة دولة جديدة")}</DialogTitle>
        <DialogContent>
          {Object.entries(formDataKeys).map(([key, label]) => (
            <TextField
              key={key}
              label={t(label)}
              name={key}
              fullWidth
              margin="dense"
              onChange={handleChange}
              value={formData[key]}
              error={!!errors[key]}
              helperText={errors[key] ? errors[key][0] : ""}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t("إلغاء")}</Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loadingSub}
          >
            {loadingSub ? <CircularProgress size={20} /> : t("إضافة")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
