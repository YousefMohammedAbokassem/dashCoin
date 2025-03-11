"use client";
import FirstStep from "./signComponent/FirtsStep";
import SecondStep from "./signComponent/SecondStep";
import ThirdStep from "./signComponent/ThirdStep";
import Stepper from "./signComponent/Stepper";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/slices/auth/authSlice";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
const people = [
  {
    id: 1,
    gender: "male",
  },
  {
    id: 2,
    gender: "female",
  },
];

export default function Page() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState(people[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [display_name, setDisplay_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [national_id, setNational_id] = useState("");
  const [gender, setGender] = useState(people[0]);
  const [place_of_birth, setPlace_of_birth] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [birthday, setBirthday] = useState("");
  const [card_number, setCard_number] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showIsChecked, setShowIsChecked] = useState(isChecked);
  const [otp, setOtp] = useState("");
  const [progressLog, setProgressLog] = useState(false);
  const [address, setAddress] = useState("");
  const [country_code, setCountry_code] = useState("");
  const [countries, setCountries] = useState([]);
  const [countrySend, setCountrySend] = useState("");
  const [errors, setErrors] = useState({
    address,
    birthday,
    card_number,
    country_code,
    display_name,
    first_name,
    last_name,
    national_id,
    password,
    phone_number,
    place_of_birth,
    gender,
  });

  // استرجاع البيانات من sessionStorage عند تحميل الصفحة
  useEffect(() => {
    const savedData = sessionStorage.getItem("signUpData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setFirst_name(data.first_name || "");
      setAddress(data.address || "");
      // setCountry_code(data.country_code || "");
      setLast_name(data.last_name || "");
      // setDisplay_name(data.display_name || "");
      // setPhone_number(data.phone_number || "");
      // setPassword(data.password || "");
      // setPassword_confirmation(data.password_confirmation || "");
      // setNational_id(data.national_id || "");
      setGender(data.gender || people[0]);
      setPlace_of_birth(data.place_of_birth || "");
      // setCountry_id(data.country_id || "");
      setBirthday(data.birthday || "");
      // setCard_number(data.card_number || "");
      setIsChecked(data.isChecked || false);
      setOtp(data.otp || "");
      // setCurrentStep(data.currentStep || 0);
    }
    fetchCountries();
  }, []);

  // حفظ البيانات في sessionStorage عند تغيير أي من الحقول
  useEffect(() => {
    const data = {
      first_name,
      last_name,
      // display_name,
      // phone_number,
      // password,
      // password_confirmation,
      // national_id,
      gender,
      place_of_birth,
      // country_id,
      birthday,
      // card_number,
      isChecked,
      otp,
      // currentStep,
      address,
      // country_code,
    };
    sessionStorage.setItem("signUpData", JSON.stringify(data));
  }, [
    first_name,
    last_name,
    // display_name,
    phone_number,
    // password,
    // password_confirmation,
    national_id,
    gender,
    place_of_birth,
    country_id,
    birthday,
    // card_number,
    isChecked,
    otp,
    currentStep,
    address,
    country_code,
  ]);

  const goToNextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const checkIfDisable = () => {
    if (
      currentStep === 0 &&
      gender.length &&
      birthday.length &&
      first_name.length &&
      last_name.length &&
      national_id.length &&
      place_of_birth.length
    ) {
      return false;
    }
    return true;
  };
  // sing up logic
  const [phoneLoading, setPhoneLoading] = useState(false);
  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}countries`);
      console.log(res.data.data)
      setPhoneLoading(false);
      setCountries([""]);
      res.data.data.map((ele) => {
        setCountries(res.data.data.map((ele) => ele.iso.toLowerCase()));
        setCountrySend(res.data.data.map((ele) => ele));
        setCountry_code(res.data.data[0].code);
      });
      setPhoneLoading(true);
    } catch (error) {
      setPhoneLoading(true);
    }
  };
  // تشفير
  const [data, setData] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");

  const KEY = CryptoJS.enc.Utf8.parse(
    import.meta.env.VITE_API_URL_CRYPT.substring(7, 39)
  ); // Mimics Laravel's substr(7, 32)
  // Encrypt function (React)
  const encryptData = (data) => {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const encryptedPayload = CryptoJS.enc.Base64.stringify(
      iv.concat(encrypted.ciphertext)
    );
    setEncryptedData(encryptedPayload);

    // In your case, you would send encryptedPayload directly to Laravel here
    // For this example, we're just logging it to demonstrate the result.
  };
  // Decrypt function (React)
  const decryptData = (encryptedPayload) => {
    const decodedPayload = CryptoJS.enc.Base64.parse(encryptedPayload);
    const iv = CryptoJS.lib.WordArray.create(decodedPayload.words.slice(0, 4));
    const encryptedData = CryptoJS.lib.WordArray.create(
      decodedPayload.words.slice(4)
    );

    const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedData }, KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    setDecryptedData(decrypted.toString(CryptoJS.enc.Utf8));
  };
  // تشفير
  const signUp = async (e) => {
    e.preventDefault();
    if (isChecked === false) {
      setShowIsChecked(true);
      return null;
    } else {
    }
    setProgressLog(true);
    setErrors({});
    const formData = new FormData(); // استخدام FormData لإرسال البيانات
    formData.append("first_name", first_name.trim());
    formData.append("last_name", last_name.trim());
    formData.append("display_name", display_name.trim());
    formData.append("phone_number", phone_number.slice(country_code?.length));

    formData.append("password", password.trim());
    formData.append("password_confirmation", password_confirmation.trim());
    formData.append("national_id", national_id.trim());
    formData.append("gender", gender.gender === "male" ? "m" : "f");
    formData.append("place_of_birth", place_of_birth.trim());
    const idCountry = countrySend.filter((ele) => {
      console.log(ele)
      console.log(country_code)
      if (parseInt(ele.code) == parseInt(country_code)) {
        console.log(ele.id);
        return ele.id;
      }
    });
    // console.log(idCountry[0]?.id)
    formData.append("country_id", idCountry[0]?.id);
    console.log(idCountry[0]);
    formData.append("birthday", moment(birthday).format("YYYY-MM-DD"));
    formData.append("card_number", encryptedData);
    console.log(country_code)
    formData.append("country_code", country_code);
    formData.append("address", address);
 
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}register`,
        formData
      );

      dispatch(logIn());
      navigate("/home");
      setProgressLog(false);
    } catch (error) {
      setProgressLog(false);
      setErrors(error?.response?.data.errors);
      console.log(error)
      // goToNextStep();
    }
  };
  // sing up logic

  useEffect(() => {
    encryptData(card_number.trim());
  }, [card_number]);
  return (
    <>
      <Helmet>
        <title>{t("createAnAcoount")}</title>
      </Helmet>
      <div className="signUp flex items-center ">
        <div className="FormAccount w-full sm:w-[60%] md:w-[50%] px-5 md:px-10">
          <div className="relative">
            <div
              className={`absolute -top-8 ${
                localStorage.getItem("i18next") === "ar"
                  ? "-right-2"
                  : "-left-2"
              } cursor-pointer  ${currentStep === 0 && "hidden"}`}
              onClick={goToPreviousStep}
            >
              {localStorage.getItem("i18next") === "ar" ? (
                <ChevronRightIcon className="w-10 h-10 text-[#85878B] dark:text-[#FFFFFF]" />
              ) : (
                <ChevronLeftIcon className="w-10 h-10 text-[#85878B] dark:text-[#FFFFFF]" />
              )}
            </div>
            <form className="createAn">
              <h1 className="text-[#1D1D1D] dark:text-[#fff] flex items-center justify-center text-2xl font-bold mt-12 mb-4">
                {t("createAnAcoount")}
              </h1>
            </form>
            <Stepper
              lng={localStorage.getItem("i18next")}
              currentStep={currentStep}
            />
            {currentStep === 0 && (
              <FirstStep
                lng={localStorage.getItem("i18next")}
                selected={gender}
                setSelected={setGender}
                selectedDate={birthday}
                setSelectedDate={setBirthday}
                people={people}
                first_name={first_name}
                display_name={display_name}
                setDisplay_name={setDisplay_name}
                setFirst_name={setFirst_name}
                last_name={last_name}
                setLast_name={setLast_name}
                national_id={national_id}
                setNational_id={setNational_id}
                place_of_birth={place_of_birth}
                setPlace_of_birth={setPlace_of_birth}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            {currentStep === 1 && (
              <SecondStep
                lng={localStorage.getItem("i18next")}
                card_number={card_number}
                setCard_number={setCard_number}
                country_id={country_id}
                setCountry_id={setCountry_id}
                password={password}
                password_confirmation={password_confirmation}
                setPassword={setPassword}
                setPassword_confirmation={setPassword_confirmation}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                address={address}
                setAddress={setAddress}
                country_code={country_code}
                setCountry_code={setCountry_code}
                phone_number={phone_number}
                setPhone_number={setPhone_number}
                errors={errors}
                setErrors={setErrors}
                showIsChecked={showIsChecked}
                setShowIsChecked={setShowIsChecked}
                countries={countries}
                setPhoneLoading={setPhoneLoading}
                phoneLoading={phoneLoading}
              />
            )}
            {currentStep === 2 && (
              <ThirdStep
                lng={localStorage.getItem("i18next")}
                otp={otp}
                setOtp={setOtp}
                progressLog={progressLog}
              />
            )}

            {currentStep !== 2 && (
              <div className="mt-6">
                {/* ${
                  currentStep === 2 &&
                  "opacity-90 pointer-events-none cursor-not-allowed"
                } */}
                <button
                  type="button"
                  className={`border-[#CDCDCD] bg-[#275963] text-white dark:bg-[#E1B145]  border-[1px]  dark:text-white rounded-md px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]
                ${
                  currentStep === 2 &&
                  "opacity-90 flex justify-center pointer-events-none cursor-not-allowed"
                }
                 font-bold flex justify-center`}
                  onClick={
                    currentStep === 0
                      ? goToNextStep
                      : currentStep === 1
                      ? (e) => signUp(e)
                      : ""
                  }
                  disabled={progressLog}
                >
                  {progressLog ? (
                    <FaSpinner className="animate-spin" /> // عرض أيقونة التحميل
                  ) : currentStep === 0 ? (
                    t("next")
                  ) : currentStep === 1 ? (
                    t("submit")
                  ) : (
                    t("verification")
                  )}
                </button>
              </div>
            )}

            <div className="flex items-center justify-center m-10">
              <Link
                to={"/SignIn"}
                className="text-[#1D1D1D] dark:text-[#FFFFFF]"
              >
                {t("doYou")}{" "}
                <u className=" dark:text-[#E1B145] text-[#275963]">
                  {t("logIn")}
                </u>
              </Link>
            </div>
          </div>
        </div>
        <div className="image hidden sm:block sm:w-[40%] md:w-[50%] h-full fixed left-0 top-0">
          <img
            src="/images/SingUp.jpg"
            alt="signUp image"
            className="w-full h-full "
          />
        </div>
        {/* <div className="image w-[60%]"></div> */}
      </div>
    </>
  );
}
