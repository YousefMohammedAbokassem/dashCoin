import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TableRow from "./TableRow";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import TableSkeleton from "../../../../../components/TableSkeleton";

const head = [
  { content: "sequence" },
  { content: "نوع العمولة" },
  { content: "القيمة" },
  { content: "تعديل" },
];

export default function Commissions() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [body, setBody] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(body.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = body.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}value_commission/get`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
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
              <TableRow
                currentData={currentData}
                fetchData={fetchData}
                setBody={setBody}
              />
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination flex items-center justify-between h-10 mt-4 p-6">
            <div className="items flex items-center gap-2">
              <p className="text-[#1D1D1D] dark:text-[#fff]">
                {t("itemsPerPage")}
              </p>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="bg-[#275963] dark:bg-[#E1B145] text-[#fff] py-[6px] px-2 mx-2 rounded-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <p className="text-[#1D1D1D] dark:text-[#fff]">
                {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, body.length)}{" "}
                من {body.length} عنصر
              </p>
            </div>
            <div className="pages flex items-center gap-4">
              <div className="taps flex items-center gap-2">
                <button
                  className={`previous py-1 px-3 font-bold rounded-sm bg-[#275963] dark:bg-[#E1B145] text-[#fff] ${
                    currentPage === 1
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  } `}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>
                <button
                  className={`next py-1 px-3 font-bold rounded-sm bg-[#275963] dark:bg-[#E1B145] text-[#fff] ${
                    currentPage >= totalPages
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  } `}
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
                {t("from")} {totalPages} {t("pages")}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
