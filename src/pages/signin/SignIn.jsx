"use client";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import { FaSpinner } from "react-icons/fa"; // استيراد أيقونة التحميل
import { logIn } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";

export default function Page() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [display_name, setDisplay_name] = useState("");
  const [progressLog, setProgressLog] = useState(false);
  const [errors, setErrors] = useState({}); // إضافة حالة الأخطاء
  const [MessageError, setMessageError] = useState(""); // إضافة حالة الأخطاء

  const signIn = async (e) => {
    e.preventDefault();
    setProgressLog(true);
    setErrors({}); // إعادة تعيين الأخطاء قبل إرسال الطلب
    setMessageError("");
    const formData = new FormData();
    formData.append("phone_number", phone_number);
    formData.append("device_token", 'phone_number');
    // console.log()
    // formData.append("phone_number", `0${phone_number.trim().slice(3)}`);
    formData.append("password", password.trim());
    formData.append("display_name", display_name.trim()); // إضافة الاسم التعريفي

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}login`,
        formData
      );
      setProgressLog(false);
      dispatch(logIn());
      navigate("/home");
      localStorage.setItem("access_token", res.data.data.token);
      // Handle successful login (e.g., redirect or store token)
    } catch (error) {
      setProgressLog(false);
      console.log(error);
      setErrors(error?.response?.data?.errors || {}); // تخزين الأخطاء
      setMessageError(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("logIn")}</title>
      </Helmet>
      <div className="signUp flex items-start ">
        <div className="FormAccount w-full sm:w-[60%] md:w-[50%] px-5 md:px-10 ">
          <div className="relative">
            <form className="createAn">
              <h1 className="text-[#1D1D1D] dark:text-[#fff] flex items-center justify-center text-2xl font-bold mt-10 mb-4">
                {t("logIn")}
              </h1>
              <div className="">
                {/* حقل رقم الهاتف */}
                <div className="flex gap-2 flex-col mt-6">
                  <PhoneInput
                    country={"sy"}
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
                    value={phone_number}
                    onChange={(value) => setPhone_number(value)}
                  />
                  {errors?.phone_number && (
                    <p className="text-red-500 text-sm font-bold">
                      {t(errors.phone_number[0])}
                    </p>
                  )}
                </div>

                {/* حقل الاسم التعريفي */}
                <div className="flex gap-2 flex-col mt-6">
                  <input
                    type="text"
                    name="display_name"
                    value={display_name}
                    onChange={(e) => setDisplay_name(e.target.value)}
                    placeholder={`${t("displayName")}`}
                    className={`border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]`}
                  />
                  {errors?.display_name && (
                    <p className="text-red-500 text-sm font-bold">
                      {t(errors.display_name[0])}
                    </p>
                  )}
                </div>

                {/* حقل كلمة المرور */}
                <div className="flex gap-4 mt-6 relative  flex-col ">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={`${t("password")}`}
                    className={`border-[#CDCDCD] px-3 border-[1px] text-black dark:text-white rounded-md bg-transparent  py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]`}
                  />
                  {MessageError && (
                    <p className="text-red-500 text-sm font-bold">
                      {t("theInfoIsIncorrect")}
                    </p>
                  )}
                  <button
                    type="button"
                    className={`absolute ${
                      localStorage.getItem("i18nextLng") === "ar"
                        ? "left-3"
                        : "right-3"
                    } top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400`}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <Link
                  to="/ForgotPassword"
                  className="dark:text-[#E1B145] text-[#275963] underline my-4 block"
                >
                  {t("didYouForget")}
                </Link>
              </div>
            </form>
            <div className="mt-6">
              <button
                type="button"
                className={`border-[#CDCDCD] bg-[#275963] text-white dark:bg-[#E1B145]  border-[1px]  dark:text-white rounded-md px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145] font-bold flex items-center justify-center`}
                disabled={progressLog}
                onClick={signIn}
              >
                {progressLog ? (
                  <FaSpinner className="animate-spin" /> // عرض أيقونة التحميل
                ) : (
                  t("logIn") // عرض نص "تسجيل الدخول"
                )}
              </button>
            </div>

            <div className="flex items-center justify-center m-10">
              <Link
                to={"/SignUp"}
                className="text-[#1D1D1D] dark:text-[#FFFFFF]"
              >
                {t("didnotYou")}{" "}
                <u className=" dark:text-[#E1B145] text-[#275963]">
                  {t("createAnAcoount")}
                </u>
              </Link>
            </div>
          </div>
        </div>
        <div className="image hidden sm:block sm:w-[40%] md:w-[50%] h-full fixed left-0 top-0">
          <img
            src="/images/SingUp.jpg"
            alt="signUp image"
            width={700}
            height={700}
            className="w-full h-full "
          />
        </div>
      </div>
    </>
  );
}
