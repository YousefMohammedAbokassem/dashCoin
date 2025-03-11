"use client";

import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/16/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OtpInput from "react-otp-input";
import { useTranslation } from "react-i18next";
export default function SecondStep({ lng, otp, setOtp, errors }) {
  const { t } = useTranslation(lng);
  return (
    <div className="">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span></span>}
        renderInput={(props) => (
          <input
            {...props}
            className="custom-input text-[#1D1D1D] dark:text-[#fff] mx-2 focus:dark:outline-[#E1B145] focus:outline-[#275963] caret-[#275963] dark:caret-[#E1B145]  "
          />
        )}
        inputStyle={{
          flex: "1",
          padding: "10px 5px",
          background: "transparent",
          width: "calc(100% / 6)",
          height: "90px",
          border: "1px solid #828282",
          borderRadius: "10px",
          fontSize: "25px",
          marginTop: "100px",
        }}
      />
      {errors?.code && (
        <p className="mt-1 block text-red-500 font-bold">
          {t("pleaseTryAgain")}
        </p>
      )}
      <p className="text-[#1D1D1D] dark:text-[#fff] mt-10">
        {t("youDidNot")}{" "}
        <u className="text-[#275963] dark:text-[#E1B145] cursor-pointer">
          {t("reSend")}
        </u>
      </p>
      <div className="mx-auto text-center mt-20 text-[#1D1D1D] dark:text-[#fff] ">
        {t("new_code")} 0:20
      </div>
    </div>
  );
}
