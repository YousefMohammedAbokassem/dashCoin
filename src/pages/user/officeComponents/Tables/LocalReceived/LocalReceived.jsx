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
  const [pagination, setPagination] = useState({});

  const [searchParams] = useSearchParams();
  const tableParam = searchParams.get("table");
  const userId = tableParam?.split("/")[1];

  const fetchData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}admin/user_financial_traffic/local/received/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setBody(res.data?.data?.data || []);
      setPagination(res.data?.data || {});
    } catch (error) {
      console.log({error})
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
        <>
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

          {/* Pagination */}
          <div className="pagination flex items-center justify-between h-10 mt-4 p-6">
            <div className="items flex items-center gap-2">
              <p className="text-[#1D1D1D] dark:text-[#fff]">
                {pagination.from}-{pagination.to} من {pagination.total} عنصر
              </p>
            </div>
            <div className="pages flex items-center gap-4">
              <div className="taps flex items-center gap-2">
                <button
                  className={`py-1 px-3 font-bold rounded-sm bg-[#275963] dark:bg-[#E1B145] text-[#fff] ${
                    pagination.current_page === 1
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }`}
                  onClick={() => fetchData(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                >
                  {"<"}
                </button>
                <button
                  className={`py-1 px-3 font-bold rounded-sm bg-[#275963] dark:bg-[#E1B145] text-[#fff] ${
                    pagination.current_page === pagination.last_page
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }`}
                  onClick={() => fetchData(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                >
                  {">"}
                </button>
              </div>
              <select
                value={pagination.current_page}
                onChange={(e) => fetchData(Number(e.target.value))}
                className="bg-[#275963] dark:bg-[#E1B145] text-[#fff] py-[6px] px-2 mx-2 rounded-sm"
              >
                {Array.from({ length: pagination.last_page }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <p className="text-[#1D1D1D] dark:text-[#fff]">
                {t("from")} {pagination.last_page} {t("pages")}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
