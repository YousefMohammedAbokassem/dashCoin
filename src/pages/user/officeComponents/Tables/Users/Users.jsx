import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TableRow from "./TableRow";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import TableSkeleton from "../../../../../components/TableSkeleton";

const head = [
  { content: "الرقم" },
  { content: "الاسم الأول" },
  { content: "الاسم الأخير" },
  { content: "رقم الهاتف" },
  { content: "الرقم الوطني" },
  { content: "الرصيد المحلي" },
  { content: "الرصيد الدولي" },
  { content: "الجنس" },
  { content: "مكان الولادة" },
  { content: "العنوان" },
  { content: "تاريخ الميلاد" },
  { content: "عدد البطاقات" },
  { content: "عدد بطاقات الجوائز" },
];

export default function Users() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [body, setBody] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}admin/user_financial_traffic/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
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
            <TableRow currentData={body} />
          </tbody>
        </table>
      )}
    </div>
  );
}
