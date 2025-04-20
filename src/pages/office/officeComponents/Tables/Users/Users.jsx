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
  const [searchValue, setSearchValue] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100); // Set default to 100
  const [totalPages, setTotalPages] = useState(1); // Store the total number of pages

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}admin/user_financial_traffic/users?page=${page}&per_page=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setBody(res.data?.data?.data || []);
      setTotalPages(res.data?.data?.last_page || 1); // Set total pages from API
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => {
        const nextPage = prev + 1;
        fetchData(nextPage); // Fetch new page data
        return nextPage;
      });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => {
        const prevPage = prev - 1;
        fetchData(prevPage); // Fetch previous page data
        return prevPage;
      });
    }
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) return fetchData(); // لو فاضي رجّع البيانات الأصلية

    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }admin/admin_search/users?search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
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
    fetchData(); // Fetch the first page data
  }, [itemsPerPage]); // Re-fetch when itemsPerPage changes

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex flex-row gap-2 mb-4 p-2">
        <input
          type="text"
          placeholder={t("ابحث بالاسم")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full sm:w-auto flex-1 px-4 py-2 rounded border border-gray-300 dark:bg-[#1d1d1d] dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="bg-[#275963] text-white px-4 py-2 rounded-md"
        >
          {t("بحث")}
        </button>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <>
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
          {/* pagination */}
          <div className="pagination flex items-center justify-between h-10 mt-4 p-6">
            <div className="items flex items-center gap-2">
              <p className="text-[#1D1D1D] dark:text-[#fff]">
                {t("itemsPerPage")}
              </p>
              <p className="text-[#1D1D1D] dark:text-[#fff]">
                {currentPage}-{Math.min(currentPage * itemsPerPage, body.length)}{" "}
                من {body.length} عنصر
              </p>
            </div>
            <div className="pages flex items-center gap-4">
              <div className="taps flex items-center gap-2">
                <button
                  className={`py-1 px-3 font-bold rounded-sm bg-[#275963] dark:bg-[#E1B145] text-[#fff] ${
                    currentPage === 1
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }`}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>
                <button
                  className={`py-1 px-3 font-bold rounded-sm bg-[#275963] dark:bg-[#E1B145] text-[#fff] ${
                    currentPage >= totalPages
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }`}
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              </div>
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="bg-[#275963] dark:bg-[#E1B145] text-[#fff] py-[6px] px-2 mx-2 rounded-sm"
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <p className="text-[#1D1D1D] dark:text-[#fff]">
                {t("من")} {totalPages} {t("صفحات")}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
