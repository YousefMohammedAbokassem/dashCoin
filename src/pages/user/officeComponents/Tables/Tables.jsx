import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import LocalReceived from "./LocalReceived/LocalReceived";
import LocalSended from "./LocalSended/LocalSended";
import InternationalReceived from "./InternationalReceived/InternationalReceived";
import InternationalSended from "./InternationalSended/InternationalSended";
import LocalEvent from "./LocalEvent/LocalEvent";
import InternationalEvent from "./InternationalEvent/InternationalEvent";

export default function Tables({ theTable }) {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(theTable)}</title>
      </Helmet>
      {theTable === "localReceived" ? (
        <LocalReceived />
      ) : theTable === "localSended" ? (
        <LocalSended />
      ) : theTable === "internationalReceived" ? (
        <InternationalReceived />
      ) : theTable === "internationalSended" ? (
        <InternationalSended />
      ) :theTable === "localEvent" ? (
        <LocalEvent />
      ) :theTable === "internationalEvent" ? (
        <InternationalEvent />
      ) : (
        ""
      )}
    </>
  );
}
