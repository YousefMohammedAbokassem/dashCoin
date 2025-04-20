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
  { content: "رقم هاتف المرسل اليه " },
  { content: "المبلغ" },
  { content: "تاريخ العملية" },
  { content: "الوقت" },
];

export default function LocalSended() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [body, setBody] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    nextPage: null,
    prevPage: null,
  });

  const [searchParams] = useSearchParams();
  const tableParam = searchParams.get("table");
  const userId = tableParam?.split("/")[1];

  const fetchData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}admin/user_financial_traffic/local/sended/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setBody(res.data?.data?.data || []);
      setPagination({
        currentPage: res.data?.data?.current_page || 1,
        totalPages: res.data?.data?.last_page || 1,
        nextPage: res.data?.data?.next_page_url,
        prevPage: res.data?.data?.prev_page_url,
      });
    } catch (error) {
      console.log({error})
      if (error.response?.status === 401) {
        dispatch(logoutUser());
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (pagination.nextPage) {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.prevPage) {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, pagination.currentPage]);

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
                {t("itemsPerPage")}
              </p>
              <p className="text-[#1D1D1D] dark:text-[#fff]">
                {pagination.currentPage} من {pagination.totalPages} {t("pages")}
              </p>
            </div>
            <div className="pages flex items-center gap-4">
              <div className="taps flex items-center gap-2">
                <button
                  className={`py-1 px-3 font-bold rounded-sm bg-[#275963] dark:bg-[#E1B145] text-[#fff] ${
                    !pagination.prevPage
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }`}
                  onClick={handlePrevPage}
                  disabled={!pagination.prevPage}
                >
                  {"<"}
                </button>
                <button
                  className={`py-1 px-3 font-bold rounded-sm bg-[#275963] dark:bg-[#E1B145] text-[#fff] ${
                    !pagination.nextPage
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }`}
                  onClick={handleNextPage}
                  disabled={!pagination.nextPage}
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
