import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Welcome } from "./officeComponents/Welcome";
import Aside from "./officeComponents/Aside";
import TablesAside from "./officeComponents/TablesAside";

export default function Office() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("office")}</title>
      </Helmet>
      <div className="h-[70px]  bg-[#275963] text-[#fff] font-bold text-xl flex items-center">
        <Welcome />
      </div>
      <div className="flex">
        <Aside />
        <TablesAside />
      </div>
      {/* <div>Office</div> */}
    </>
  );
}
