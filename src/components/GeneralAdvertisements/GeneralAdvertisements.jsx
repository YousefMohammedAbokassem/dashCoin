import React from "react";
import { useTranslation } from "react-i18next";
import AdSlider from "./AdSlider";

export default function GeneralAdvertisements() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center text-[#1D1D1D] my-6 ">
        <span className="font-bold text-lg text-[#1D1D1D] dark:text-[#fff]">
          {t("generalAdvertisements")}
        </span>
      </div>
      <AdSlider />
    </div>
  );
}
