import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Cards from "./Cards/Cards";
import Measures from "./Measures/Measures";
import Categories from "./CategoriesProduct/CategoriesProduct";
import Cities from "./Cities/Cities";
import Countries from "./Countries/Countries";
import Banners from "./Banners/Banners";
import Announcements from "./Announcement/Announcement";
import News from "./News/News";
import Commissions from "./Commission/Commissions";
import Events from "./Events/Events";
import Users from "./Users/Users";

export default function Tables({ theTable }) {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(theTable)}</title>
      </Helmet>
      {theTable === "localReceived" ? (
        <Cards />
      ): (
        ""
      )}
    </>
  );
}
