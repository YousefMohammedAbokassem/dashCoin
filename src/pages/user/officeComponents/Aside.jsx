import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

// مصفوفة تحتوي على العناصر
const menuItems = [
  "localReceived",
];

export default function Aside() {
  const { t } = useTranslation();
  const location = useLocation();
  const [table, setTable] = useState("");
  const [id, setId] = useState("");

  // استخدام useEffect لتحديث المتغير عند تغيير الـ query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tableParam = params.get("table");
    if (tableParam) {
      const tableName = tableParam.split("/")[0]; // استخراج الجزء قبل "/"
      setTable(tableName); // تخزين القيمة في المتغير
      const idValue = tableParam.split("/")[1]; // استخراج الـ id بعد "/"
      setId(idValue); // تخزين الـ id في المتغير
    }
  }, [location]);

  return (
    <aside className="w-[20%] aside bg-[#275963] text-white">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={id ? `/User?table=${item}/${id}` : `/home?table=users`} // إضافة الرابط الافتراضي إذا لم يوجد id
              className={`${
                table === item ? "isActive" : ""
              } p-6 asideRoutes block cursor-pointer text-start hover:bg-[#E1B145] hover:font-bold`}
            >
              {t(item)}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
