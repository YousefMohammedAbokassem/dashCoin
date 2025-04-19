import React, { useEffect, useState } from "react";
import HeaderPageTable from "./HeaderPageTable";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Tables from "./Tables/Tables";

export default function TablesAside() {
  const { t } = useTranslation();
  const location = useLocation();
  const [table, setTable] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tableParam = params.get("table"); // ex: "localReceived/8"
    if (tableParam) {
      setTable(tableParam.split("/")[0]); // => "localReceived"
    }
  }, [location]);

  return (
    <div className="flex-1 max-w-[1000px] lg:max-w-full overflow-x-auto">
      <HeaderPageTable title={table} />
      <Tables theTable={table} />
    </div>
  );
}
