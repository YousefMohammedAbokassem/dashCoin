import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TableRow from "./TableRow";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import TableSkeleton from "../../../../../components/TableSkeleton";
import { useSearchParams } from "react-router-dom";

const head = [
  { content: "الرقم التسلسلي" },
  { content: "رقم العملية" },
  { content: "الاسم الكامل" },
  { content: "رقم هاتف المرسل" },
  { content: "المبلغ" },
  { content: "تاريخ العملية" },
  { content: "الوقت" },
];

export default function LocalReceived() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [body, setBody] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const tableParam = searchParams.get("table"); // ex: "localReceived/8"
  const userId = tableParam?.split("/")[1]; // 8
  console.log(userId);
  const fetchData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${ 
          import.meta.env.VITE_API_URL
        }admin/user_financial_traffic/local/received/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(res.data)
      console.log(userId)
      setBody(res.data?.data?.data || []);
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
  }, [userId]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            <TableRow currentData={body} />
          </tbody>
        </table>
      )}
    </div>
  );
}
