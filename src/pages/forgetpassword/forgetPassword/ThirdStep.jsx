"use client";

import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/16/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

export default function ThirdStep({
  lng,
  card_number,
  setCard_number,
  country_id,
  setCountry_id,
  password,
  password_confirmation,
  setPassword,
  setPassword_confirmation,
  isChecked,
  setIsChecked,
  showIsChecked,
  setShowIsChecked,
  address,
  setAddress,
  setCountry_code,
  country_code,
  phone_number,
  setPhone_number,
  errors,
  setErrors,
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
      {/* كلمة المرور */}
      <div className="relative flex flex-col">
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("newPassword")}
          className="border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]"
        />
        <button
          type="button"
          className={`absolute ${
            localStorage.getItem("i18nextLng") === "ar" ? "left-3" : "right-3"
          } top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400`}
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
        {errors?.password && (
          <p className="mt-1 block text-red-500 font-bold">
            {errors.password[0]}
          </p>
        )}
      </div>

      {/* تأكيد كلمة المرور */}
      <div className="relative flex flex-col">
        <input
          type={confirmPasswordVisible ? "text" : "password"}
          name="confirm_password"
          value={password_confirmation}
          onChange={(e) => setPassword_confirmation(e.target.value)}
          placeholder={t("newConfirmPassword")}
          className="border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]"
        />
        <button
          type="button"
          className={`absolute ${
            localStorage.getItem("i18nextLng") === "ar" ? "left-3" : "right-3"
          } top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400`}
          onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          {confirmPasswordVisible ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
        {errors?.password_confirmation && (
          <p className="mt-1 block text-red-500 font-bold">
            {errors.password_confirmation[0]}
          </p>
        )}
      </div>
    </div>
  );
}
