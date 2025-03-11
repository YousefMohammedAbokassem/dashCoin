import React from "react";
import { useTranslation } from "react-i18next";

export default function Search() {
  const { t } = useTranslation();
  return (
    <div className="relative w-full max-w-[14rem] 2xl:max-w-[40rem]">
      <input
        type="text"
        placeholder={`${t("search")}`}
        className={`w-full py-3 ${
          localStorage.getItem("i18nextLng") == "ar"
            ? "pr-10 pl-4"
            : "pr-4 pl-10"
        } text-gray-700 dark:text-[#fff] bg-[#F5F5F5] rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#275963] focus:bg-white dark:focus:bg-[#1d1d1d] transition`}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
      </div>
    </div>
  );
}
