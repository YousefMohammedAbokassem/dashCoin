"use client";

import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/16/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

export default function SecondStep({
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
}) {
  const { t } = useTranslation(lng);
  const [selectedDate, setSelectedDate] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };

  return (
    <div className="">
      {/* رقم بطاقة الاشتراك */}
      <div className="flex items-center gap-4 mt-6">
        <input
          type="text"
          name="subscription_card_number"
          value={card_number}
          onChange={(e) => setCard_number(e.target.value)}
          placeholder={`${t("subscription_card_number")}`}
          className={`border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]`}
        />
      </div>

      {/* عنوان الإقامة */}
      <div className="flex items-center gap-4 mt-6">
        <input
          type="text"
          name="address"
          placeholder={`${t("address_placeholder")}`}
          className={`border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]`}
        />
      </div>

      {/* رقم الهاتف */}
      <div className="flex items-center gap-4 mt-6">
        <PhoneInput
          country={"sy"}
          inputProps={{
            name: "phone_number",
            required: true,
            placeholder: t("phone_number"),
            className:
              "border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-16 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]",
          }}
          containerClass="w-full"
          buttonStyle={{
            background: "transparent",
          }}
          dropdownStyle={{
            zIndex: 1000,
          }}
        />
      </div>

      {/* كلمة المرور */}
      <div className="flex items-center gap-4 mt-6 relative">
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`${t("password")}`}
          className={`border-[#CDCDCD] px-3 border-[1px] text-black dark:text-white rounded-md bg-transparent  py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]`}
        />
        <button
          type="button"
          className={`absolute ${
            localStorage.getItem("i18nextLng") === "ar" ? "left-3" : "right-3"
          }  top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400`}
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* تأكيد كلمة المرور */}
      <div className="flex items-center gap-4 mt-6 relative">
        <input
          type={confirmPasswordVisible ? "text" : "password"}
          name="confirm_password"
          value={password_confirmation}
          onChange={(e) => setPassword_confirmation(e.target.value)}
          placeholder={`${t("confirm_password")}`}
          className={`border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]`}
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
      </div>

      <div className="flex items-center mt-4">
        <input
          id="link-checkbox"
          type="checkbox"
          checked={isChecked} // Bind checkbox to state
          onChange={handleCheckboxChange} // Handle checkbox change
          className="w-4 h-4 text-[#275963] dark:text-[#E1B145] bg-gray-100 border-gray-300 rounded-sm focus:ring-[#275963] dark:focus:ring-[#E1B145] dark:ring-offset-[#E1B145] focus:ring-2 dark:bg-[#E1B145] dark:border-[#E1B145] accent-current"
        />
        <label
          htmlFor="link-checkbox"
          className="ms-2 text-sm font-medium text-[#1D1D1D] dark:text-[#FFFFFF]"
        >
          {t("I_agree")}
          <a href="#" className="text-[#CE1126] dark:text-[#CE1126] underline">
            {t("conditions")}
          </a>
          .
        </label>
      </div>
    </div>
  );
}
