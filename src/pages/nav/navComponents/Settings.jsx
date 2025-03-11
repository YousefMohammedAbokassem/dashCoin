import React, { useState, useEffect } from "react";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/20/solid";
import {
  Field,
  Label,
  Switch,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeLanguage } from "../../../store/slices/language/languageSlice";
import { useNavigate } from "react-router-dom";

const languages = [
  { id: 1, code: "ar" },
  { id: 2, code: "en" },
];

export default function Settings({ theme, setTheme }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => {
    return (
      languages.find(
        (lang) => lang.code === localStorage.getItem("i18nextLng")
      ) || languages[0]
    );
  });

  useEffect(() => {
    // i18n.changeLanguage(selected.code);
    localStorage.setItem("i18nextLng", selected.code);
    // changeLanguage()
    dispatch(changeLanguage(selected.code));
  }, [selected, i18n]);

  // themes
  // const [theme, setTheme] = useState(
  //   localStorage.getItem("currentTheme") || "light"
  // );

  useEffect(() => {
    const savedTheme = localStorage.getItem("currentTheme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("currentTheme", newTheme); // حفظ الاختيار في localStorage
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark"); // تفعيل الوضع الداكن
    } else {
      document.documentElement.classList.remove("dark"); // تعطيل الوضع الداكن
    }
  };
  return (
    <div className="flex items-center gap-3">
      <div className="languagesList">
        <div className="flex flex-col">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default text-start px-8 rounded-md bg-transparent py-3 text-gray-900 dark:text-gray-200 focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]">
                <div className="flex items-center gap-2">
                  <span className="block truncate">{t(selected.code)}</span>
                  <img
                    width={32}
                    height={32}
                    src={`/images/${selected.code}.png`}
                    alt={selected.code}
                  />
                </div>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute bg-[#FFFFFF] dark:bg-[#111518] z-10 mt-1 max-h-60 w-full text-left overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {languages.map((lang) => (
                  <Listbox.Option
                    key={lang.id}
                    value={lang}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-[#275963] text-white dark:bg-[#E1B145] dark:text-black"
                          : "text-gray-900 dark:text-gray-200"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center justify-between">
                        <span
                          className={`block truncate capitalize ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {t(lang.code)}
                        </span>
                        <img
                          src={`/images/${lang.code}.png`}
                          width={32}
                          height={32}
                          alt={lang.code}
                        />
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </div>
      <div className="icons flex items-center gap-3">
        <div className="w-[30px] h-[30px]">
          <button onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? (
              <svg
                width="30"
                height="30"
                viewBox="0 0 41 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-[#1D1D1D] dark:stroke-white"
              >
                <path
                  d="M23.2493 2.90384V3.42553C23.2493 5.43606 22.356 6.40321 20.4956 6.40321C18.6351 6.40321 17.8157 5.43606 17.8157 3.42553V2.90384C17.8157 0.967152 18.6351 0 20.4956 0C22.356 0 23.2493 0.967152 23.2493 2.90384ZM28.7592 5.28599L29.1309 4.83814C30.2481 3.19922 31.5868 2.97769 33.0018 4.01868C34.4907 5.06206 34.7146 6.47468 33.5974 8.1136L33.1495 8.48521C32.0323 10.1241 30.6935 10.3457 29.2785 9.23082C27.7897 8.18744 27.642 6.92252 28.7592 5.28599ZM11.9341 4.84052L12.2319 5.28837C13.3491 6.92729 13.199 8.1922 11.7841 9.2332C10.2952 10.3504 8.88022 10.1265 7.76299 8.48759L7.46522 8.11598C6.34799 6.47706 6.49807 5.06445 7.91306 4.02106C9.40191 2.97768 10.8169 3.35168 11.9341 4.84052ZM20.4956 9.75251C26.8226 9.75251 32.0347 14.9647 32.0347 21.3655C32.0347 27.6925 26.8226 32.8308 20.4956 32.8308C14.0924 32.8308 8.95644 27.6949 8.95644 21.3655C8.95644 14.9623 14.0924 9.75251 20.4956 9.75251ZM3.82053 13.028L4.34222 13.178C6.27891 13.7736 6.87445 14.8908 6.35276 16.6774C5.75722 18.464 4.56615 18.9857 2.70569 18.3902L2.184 18.2401C0.32354 17.6446 -0.348225 16.5273 0.173465 14.7407C0.769002 12.9541 1.96008 12.4324 3.82053 13.028ZM36.6489 13.178L37.1706 13.028C39.1073 12.4324 40.2984 12.9541 40.8177 14.7407C41.337 16.5273 40.7438 17.6446 38.8071 18.2401L38.3593 18.3902C36.4226 18.9857 35.2315 18.464 34.7122 16.6774C34.1167 14.8908 34.7861 13.7736 36.6489 13.178ZM20.4956 27.7687C23.9949 27.7687 26.8988 24.8649 26.8988 21.3655C26.8988 17.7923 23.9949 14.8884 20.4956 14.8884C16.9223 14.8884 14.0185 17.7923 14.0185 21.3655C14.0185 24.8649 16.9223 27.7687 20.4956 27.7687ZM2.18162 24.417L2.70331 24.2669C4.56376 23.6714 5.75484 24.1169 6.35037 25.9059C6.87206 27.6925 6.27653 28.8097 4.33984 29.4052L3.81815 29.5553C1.95769 30.1508 0.76662 29.7054 0.171083 27.9164C-0.350607 26.1298 0.321158 25.0126 2.18162 24.417ZM38.3617 24.2693L38.8095 24.4194C40.7462 25.0149 41.3417 26.1322 40.8201 27.9188C40.2984 29.7054 39.1073 30.1532 37.173 29.5577L36.6513 29.4076C34.7908 28.8121 34.1191 27.6948 34.7146 25.9082C35.2363 24.1216 36.4274 23.6738 38.3617 24.2693ZM7.4676 34.6174L7.76537 34.1695C8.8826 32.5306 10.2976 32.3829 11.7864 33.4239C13.2014 34.4673 13.3491 35.7322 12.2343 37.3688L11.9365 37.8166C10.8193 39.4555 9.40429 39.6032 7.91545 38.5622C6.50045 37.5188 6.35276 36.2539 7.4676 34.6174ZM33.1495 34.1695L33.5974 34.6174C34.7146 36.2563 34.4907 37.5212 33.0018 38.5622C31.5868 39.6056 30.2481 39.4555 29.1309 37.8166L28.7592 37.3688C27.642 35.7298 27.7921 34.4649 29.2809 33.4239C30.6959 32.3805 32.0323 32.5306 33.1495 34.1695ZM23.2493 39.1577V39.7533C23.2493 41.7638 22.356 42.731 20.4956 42.731C18.6351 42.731 17.8157 41.7638 17.8157 39.7533V39.1577C17.8157 37.1472 18.6351 36.1801 20.4956 36.1801C22.356 36.1801 23.2493 37.1472 23.2493 39.1577Z"
                  // fill="white"
                />
              </svg>
            ) : (
              <svg
                width="30"
                height="30"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-[#1D1D1D] dark:stroke-white"
              >
                <g clip-path="url(#clip0_724_4551)">
                  <path
                    d="M21.6011 40.6222C20.4474 40.6218 19.2956 40.5277 18.1571 40.3411C12.5883 39.4273 7.60991 36.3405 4.3153 31.7588C1.0207 27.1771 -0.320726 21.4751 0.585656 15.9051C1.09285 12.7342 2.31523 9.72033 4.16016 7.09197C6.00508 4.46362 8.42412 2.28974 11.2339 0.735102C11.708 0.470231 12.2481 0.347086 12.7902 0.380313C13.3322 0.41354 13.8532 0.60174 14.2914 0.922531C14.7392 1.22896 15.0884 1.65893 15.2963 2.16014C15.5043 2.66135 15.5621 3.2122 15.4628 3.74567L13.9399 3.62853L15.3808 3.88625C14.5679 8.19825 15.3275 12.6588 17.5219 16.4587C19.7163 20.2585 23.2 23.146 27.3411 24.5971C30.5301 25.7039 33.9609 25.9185 37.2631 25.218C37.7856 25.1154 38.3264 25.1609 38.8244 25.3492C39.3225 25.5375 39.758 25.8612 40.082 26.2838C40.406 26.7064 40.6054 27.2111 40.6579 27.741C40.7104 28.2709 40.6138 28.8049 40.3791 29.2828C38.5724 32.6987 35.8703 35.5587 32.5624 37.5562C29.2544 39.5538 25.4653 40.6136 21.6011 40.6222ZM12.4991 3.38253C10.2585 4.653 8.31033 6.38078 6.78129 8.45356C5.25225 10.5263 4.17654 12.8977 3.6241 15.4135C3.07167 17.9293 3.05487 20.5332 3.57481 23.0559C4.09474 25.5786 5.13977 27.9636 6.64194 30.056C8.4525 32.5868 10.8771 34.6156 13.6877 35.9512C16.4983 37.2869 19.6025 37.8857 22.7082 37.6912C25.814 37.4968 28.8192 36.5154 31.4412 34.8396C34.0632 33.1637 36.2158 30.8484 37.6965 28.1114C33.9286 28.8688 30.0271 28.6101 26.3922 27.3617C21.5962 25.68 17.5596 22.3386 15.0117 17.9411C12.4638 13.5435 11.5726 8.37973 12.4991 3.38253Z"
                    // fill="#1D1D1D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_724_4551">
                    <rect width="41" height="41" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </button>
        </div>
        <div className="w-[30px] cursor-pointer" onClick={() => navigate("/basket")}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-[#1D1D1D] dark:stroke-white"
          >
            <path
              d="M9.59201 6.18284H43.4139L38.8123 22.2882H12.0698M41.1131 31.4913H13.5038L8.90231 1.5813H2M15.8046 40.6944C15.8046 41.9651 14.7745 42.9952 13.5038 42.9952C12.2332 42.9952 11.2031 41.9651 11.2031 40.6944C11.2031 39.4237 12.2332 38.3936 13.5038 38.3936C14.7745 38.3936 15.8046 39.4237 15.8046 40.6944ZM41.1131 40.6944C41.1131 41.9651 40.083 42.9952 38.8123 42.9952C37.5416 42.9952 36.5115 41.9651 36.5115 40.6944C36.5115 39.4237 37.5416 38.3936 38.8123 38.3936C40.083 38.3936 41.1131 39.4237 41.1131 40.6944Z"
              // stroke="#1D1D1D"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="w-[30px]">
          <svg
            width="30"
            height="30"
            viewBox="0 0 46 46"
            // fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-[#1D1D1D] dark:stroke-white"
          >
            <path
              // fill-rule="evenodd"
              clip-rule="evenodd"
              d="M37.375 25.5875C37.6625 27.3125 37.95 28.75 38.525 30.475L40.25 35.3625L38.8125 37.375H28.75C28.75 38.8125 28.175 40.25 27.025 41.4C25.875 42.55 24.4375 43.125 23 43.125C21.5625 43.125 19.8375 42.55 18.975 41.4C17.825 40.25 17.25 38.8125 17.25 37.375H7.1875L5.75 35.3625L7.475 30.475C8.05 28.175 8.625 25.875 8.625 23.575V17.25C8.625 15.2375 8.9125 13.225 9.775 11.5C10.6375 9.4875 11.7875 8.05 13.225 6.6125C14.6625 5.175 16.3875 4.3125 18.4 3.7375C19.8375 3.1625 21.5625 2.875 23 2.875C22.425 3.7375 21.85 4.8875 21.275 6.0375C20.7 6.0375 20.125 6.0375 19.2625 6.6125C17.825 6.9 16.3875 7.7625 15.2375 8.9125C14.0875 9.775 12.9375 11.2125 12.3625 12.65C11.7875 14.0875 11.5 15.525 11.5 17.25V23.575C11.5 26.1625 10.925 28.75 10.35 31.3375L9.2 34.5H36.8L35.65 31.3375C35.1469 29.8252 34.8622 28.0887 34.6064 26.5247L34.5 25.875C35.65 25.875 36.5125 25.875 37.375 25.5875ZM23 40.25C23.575 40.25 24.4375 39.9625 25.0125 39.3875C25.5875 38.8125 25.875 38.2375 25.875 37.375H20.125C20.125 38.2375 20.4125 38.8125 20.9875 39.3875C21.5625 39.9625 22.425 40.25 23 40.25ZM43.125 11.5C43.125 13.7875 42.2163 15.9813 40.5988 17.5988C38.9813 19.2163 36.7875 20.125 34.5 20.125C32.2125 20.125 30.0187 19.2163 28.4012 17.5988C26.7837 15.9813 25.875 13.7875 25.875 11.5C25.875 9.21251 26.7837 7.0187 28.4012 5.4012C30.0187 3.7837 32.2125 2.875 34.5 2.875C36.7875 2.875 38.9813 3.7837 40.5988 5.4012C42.2163 7.0187 43.125 9.21251 43.125 11.5Z"
              // fill="#1D1D1D"
            />
            <circle cx="34.5" cy="11.5" r="8.5" fill="#E8161C" />
          </svg>
        </div>
        <div className="w-[30px] cursor-pointer" onClick={() => navigate("/Profile")}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-[#1D1D1D] dark:stroke-white"
          >
            <path
              d="M43.3327 45.5V41.1667C43.3327 38.8681 42.4196 36.6637 40.7943 35.0384C39.169 33.4131 36.9646 32.5 34.666 32.5H17.3327C15.0341 32.5 12.8297 33.4131 11.2044 35.0384C9.57911 36.6637 8.66602 38.8681 8.66602 41.1667V45.5"
              // stroke="#1D1D1D"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M26.0007 23.8333C30.7871 23.8333 34.6673 19.9531 34.6673 15.1667C34.6673 10.3802 30.7871 6.5 26.0007 6.5C21.2142 6.5 17.334 10.3802 17.334 15.1667C17.334 19.9531 21.2142 23.8333 26.0007 23.8333Z"
              // stroke="#1D1D1D"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
