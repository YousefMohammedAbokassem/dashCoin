import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Cards from "./Cards/Cards";
import Measures from "./Measures/Measures";
import CategoriesProduct from "./CategoriesProduct/CategoriesProduct";
// import CategoriesStore from "./CategoriesProduct/CategoriesProduct";
import Cities from "./Cities/Cities";
import Countries from "./Countries/Countries";
import Banners from "./Banners/Banners";
import Announcements from "./Announcement/Announcement";
import News from "./News/News";
import Commissions from "./Commission/Commissions";
import Events from "./Events/Events";
import Users from "./Users/Users";
import CategoriesStore from "./CategoriesStore/CategoriesStore";

export default function Tables({ theTable }) {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(theTable)}</title>
      </Helmet>
      {theTable === "cards" ? (
        <Cards />
      ) : theTable === "measures" ? (
        <Measures />
      ) : theTable === "categoriesStore" ? (
        <CategoriesStore />
      ) : theTable === "categoriesProduct" ? (
        <CategoriesProduct />
      ) : theTable === "cities" ? (
        <Cities />
      ) : theTable === "countries" ? (
        <Countries />
      ) : theTable === "banners" ? (
        <Banners />
      ) : theTable === "announcements" ? (
        <Announcements />
      ) : theTable === "news" ? (
        <News />
      ) : theTable === "commission" ? (
        <Commissions />
      ) : theTable === "events" ? (
        <Events />
      ) : theTable === "users" ? (
        <Users />
      ) : (
        ""
      )}
    </>
  );
}
