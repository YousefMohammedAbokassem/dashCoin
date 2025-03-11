"use client";

import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/16/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

export default function FirstStep({
  lng,
  isChecked,
  setIsChecked,
  setCountry_code,
  country_code,
  phone_number,
  setPhone_number,
  errors,
}) {
  const { t } = useTranslation(lng);
  const [selectedDate, setSelectedDate] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="space-y-6 mt-32">
      {/* رقم الهاتف */}
      <div className="flex flex-col mb-8">
        <PhoneInput
          country={"SY"}
          inputProps={{
            name: "phone_number",
            required: true,
            placeholder: t("phone_number"),
            className:
              "border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-16 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]",
          }}
          containerClass={`w-full ${
            localStorage.getItem("i18next") === "ar"
              ? "phoneDirAr"
              : "phoneDirEn"
          }`}
          buttonStyle={{
            background: "transparent",
          }}
          dropdownStyle={{
            zIndex: 1000,
          }}
          value={`${phone_number}`}
          onChange={(value, country, e, formattedValue) => {
            setPhone_number(value);
            setCountry_code(country.dialCode);
          }}
        />
        {errors?.phone_number && (
          <p className="mt-1 block text-red-500 font-bold">
            {errors.phone_number[0]}
          </p>
        )}
      </div>
    </div>
  );
}
