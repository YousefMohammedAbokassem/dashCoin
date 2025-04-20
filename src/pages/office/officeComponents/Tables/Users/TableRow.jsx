import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function TableRow({ currentData }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  console.log(currentData);
  const handleRowClick = (id) => {
    console.log(id);
    navigate(`/User?table=localReceived/${id}`);
  };

  return (
    <>
      {currentData?.map((item, i) => (
        <tr
          key={item.id}
          className="odd:bg-[#E1E2E3] even:bg-[#fff] border-b border-gray-200 hover:bg-[#D1D2D3] cursor-pointer"
          onClick={() => handleRowClick(item.id)} // Navigate on click
        >
          <td className="px-6 py-8 text-center">{i + 1}</td>
          <td className="px-6 py-8 text-center">{item.first_name}</td>
          <td className="px-6 py-8 text-center">{item.last_name}</td>
          <td className="px-6 py-8 text-center">{item.phone_number}+</td>
          <td className="px-6 py-8 text-center">{item.national_id}</td>
          <td className="px-6 py-8 text-center">
            {item.local_financial_balance.toFixed(2)}
          </td>
          <td className="px-6 py-8 text-center">
            {item.international_financial_balance.toFixed(2)}
          </td>
          <td className="px-6 py-8 text-center">
            {item.gender === "m" ? t("ذكر") : t("أنثى")}
          </td>
          <td className="px-6 py-8 text-center">{item.place_of_birth}</td>
          <td className="px-6 py-8 text-center">{item.address}</td>
          <td className="px-6 py-8 text-center">{item.birthday}</td>
          <td className="px-6 py-8 text-center">{item.total_card_number}</td>
          <td className="px-6 py-8 text-center">
            {item.total_card_number_for_reward}
          </td>
        </tr>
      ))}
    </>
  );
}
