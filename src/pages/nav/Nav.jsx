import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Settings from "./navComponents/Settings";
import Search from "./navComponents/Search";
export default function Nav() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(
    localStorage.getItem("currentTheme") || "light"
  );
  return (
    <>
      <nav className="flex items-center justify-between mainNav h-[80px] max-h-[100px] container mx-auto">
        <div className="logo w-24">
          <img
            src={`/icons/${theme}.svg`}
            // src="/public/icons/COLOR.svg"
            className="w-full h-full"
            alt="snc"
          />
        </div>
        <div className="routes">
          <ul className="flex items-center justify-center">
            <li>
              <NavLink
                className="block w-full h-full p-4 mx-2 bg:text-[#1D1D1D] dark:text-[#fff] hover:scale-110 hover:font-bold"
                to="/home"
              >
                {t("home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block w-full h-full p-4 mx-2 bg:text-[#1D1D1D] dark:text-[#fff] hover:scale-110 hover:font-bold"
                to="/office?table=inComingNational"
              >
                {t("office")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block w-full h-full p-4 mx-2 bg:text-[#1D1D1D] dark:text-[#fff] hover:scale-110 hover:font-bold"
                to=""
              >
                {t("transfare")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block w-full h-full p-4 mx-2 bg:text-[#1D1D1D] dark:text-[#fff] hover:scale-110 hover:font-bold"
                to="/events"
              >
                {t("events")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block w-full h-full p-4 mx-2 bg:text-[#1D1D1D] dark:text-[#fff] hover:scale-110 hover:font-bold"
                to=""
              >
                {t("contactUs")}
              </NavLink>
            </li>
          </ul>
        </div>
        <Search />
        <Settings theme={theme} setTheme={setTheme} />
      </nav>
    </>
  );
}
