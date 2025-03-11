import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillEdit, AiFillDelete, AiOutlineStop } from "react-icons/ai";
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
  const [openBanDialog, setOpenBanDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToBan, setItemToBan] = useState(null);
  const [editData, setEditData] = useState({
    method: "_PUT",
    name: "",
    logo: "",
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
        `${import.meta.env.VITE_API_URL}admin/market_category/delete/${
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

  const onBan = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}admin/get_events/pan/${
          itemToBan.id
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      fetchData();
      setOpenBanDialog(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpen = (item) => {
    setItemToDelete(item);
    setOpen(true);
  };

  const handleBanDialogOpen = (item) => {
    setItemToBan(item);
    setOpenBanDialog(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setItemToDelete(null);
  };

  const handleBanDialogClose = () => {
    setOpenBanDialog(false);
    setItemToBan(null);
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
            <img
              src={`${import.meta.env.VITE_API_URL_IMAGE}${item.logo}`}
              alt={item.name}
              className="w-52 h-24"
            />
          </td>
          <td className="px-6 py-8 text-center">{item.market_category}</td>
          <td className="px-6 py-8 text-center">{item.address}</td>
          <td className="px-6 py-8 text-center">
            {item.is_panned !== 1 ? t("فعال") : t("غير فعال")}
          </td>

          <td className="px-6 py-8 text-center">
            <button
              onClick={() => handleBanDialogOpen(item)}
              className="text-red-500 hover:text-red-700"
            >
              <AiOutlineStop size={20} />
            </button>
          </td>
        </tr>
      ))}

      {/* Dialog for ban confirmation */}
      <Dialog open={openBanDialog} onClose={handleBanDialogClose}>
        <DialogTitle>{t("Confirm Ban")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Are you sure you want to ban this category?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBanDialogClose}>{t("No")}</Button>
          <Button
            onClick={onBan}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : t("Yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}