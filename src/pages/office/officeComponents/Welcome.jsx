import React from "react";
import { useTranslation } from "react-i18next";

export const Welcome = () => {
  const { t } = useTranslation();
  return (
    <div className="px-4 text-[#FFF]">
      <span>يوسف أبوقاسم</span>
      {t("welcome")}
    </div>
  );
};
