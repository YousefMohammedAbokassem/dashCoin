import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";

export default function Categories() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}get_categories?paginate=1&perPage=5`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setCategories(res.data?.data?.data || []);
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
    <div className="container mx-auto">
      <div className="flex justify-between items-center text-[#1D1D1D] mb-6 ">
        <span className="font-bold text-lg text-[#1D1D1D] dark:text-[#fff]">
          {t("categories")}
        </span>
        <Link
          to="/Categories"
          className="opacity-40 text-lg text-[#1D1D1D] dark:text-[#fff] dark:opacity-70"
        >
          {t("showAll")}
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {loading
            ? Array(4)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-40 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"
                  ></div>
                ))
            : categories.slice(0, 4).map((category) => (
                <div
                  key={category.id}
                  className="bg-[#F3F5F7] dark:bg-[#2e2e2e] dark:text-white p-5 h-full flex cursor-pointer"
                >
                  <div className="flex flex-row-reverse h-full">
                    <div className="info flex flex-col justify-center items-center self-end mb-4 w-[100px]">
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <Link
                        to={`/category/${category.id}`}
                        className="flex items-center gap-1 underline categoryShop"
                      >
                        <span>{t("shopNow")}</span>
                      </Link>
                    </div>
                    <div className="image h-full w-full">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/images/${category.image}`}
                        alt={category.name}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {categories.length > 4 && (
          <div className="col-span-1 bg-[#F3F5F7] dark:bg-[#2e2e2e] dark:text-white p-5 h-full">
            <div className="flex flex-col h-full">
              <div className="info self-end flex flex-col justify-center items-center">
                <h3 className="font-bold text-lg">{categories[4].name}</h3>
                <Link
                  to={`/category/${categories[4].id}`}
                  className="flex items-center gap-1 underline categoryShop"
                >
                  <span>{t("shopNow")}</span>
                </Link>
              </div>
              <div className="image h-full w-full">
                <img
                  src={`${import.meta.env.VITE_API_URL}/images/${categories[4].image}`}
                  alt={categories[4].name}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}