"use client";
// import { useTranslation } from "@/i18n/client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Stepper = ({ lng, currentStep }) => {
  const { t } = useTranslation();

  return (
    <div className="stpper mb-6">
      <p className="mb-2 text-[#275963] dark:text-[#E1B145]">
        {currentStep === 0 && t("firstStep")}
        {currentStep === 1 && t("secondStep")}
        {currentStep === 2 && t("thirdStep")}
      </p>
      {/* steps */}
      <div className="flex justify-center items-center gap-3 mb-4">
        <div
          className={`firstStep  ${
            0 <= currentStep ? "bg-[#275963] dark:bg-[#E1B145]" : "bg-[#E7E7E7]"
          }  h-2 flex-1 rounded-full`}
        ></div>
        <div
          className={`secondStep  ${
            1 <= currentStep ? "bg-[#275963] dark:bg-[#E1B145]" : "bg-[#E7E7E7]"
          } h-2 flex-1 rounded-full`}
        ></div>
        <div
          className={`thirdStep  ${
            2 <= currentStep ? "bg-[#275963] dark:bg-[#E1B145]" : "bg-[#E7E7E7]"
          } h-2 flex-1 rounded-full`}
        ></div>
      </div>
    </div>
  );
};

export default Stepper;
