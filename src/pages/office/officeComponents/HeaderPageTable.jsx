import React from "react";
import { useTranslation } from "react-i18next";

export default function HeaderPageTable({ title }) {
  const { t } = useTranslation();
  return (
    <div className="h-[60px] p-4 text-[#1D1D1D] dark:text-[#fff]  font-bold text-xl flex items-center">
      {t(title)}
    </div>
  );
}
