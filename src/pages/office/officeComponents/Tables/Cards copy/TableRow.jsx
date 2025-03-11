import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function TableRow({ currentData, onEdit, onDelete }) {
  const { t } = useTranslation();

  return (
    <>
      {currentData?.map((item) => (
        <tr
          key={item.serial_number}
          className="odd:bg-[#dba2a2] odd:dark:bg-[#34373B] even:bg-[#fff] even:dark:bg-[#26292C] border-b dark:border-gray-700 border-gray-200 transition-colors duration-200 hover:bg-[#E0E0E0] hover:dark:bg-[#3F4246]"
        >
          <td className="px-6 py-8 text-center text-[#275963] dark:text-[#E1B145]">
            {item.serial_number}
          </td>
          <td className="px-6 py-8 text-center">{item.date}</td>
          <td className="px-6 py-8 text-center">{item.time}</td>
          <td className="px-6 py-8 text-center">{item.sender_phone_number}</td>
          <td className="px-6 py-8 text-center">{item.full_name}</td>
          <td className="px-6 py-8 text-center">{item.number_of_process}</td>
          <td className="px-6 py-8 text-center">{item.amount}</td>
          <td className="px-6 py-8 text-center">
            <button
              onClick={() => onEdit(item)}
              className="text-blue-500 hover:text-blue-700 mx-2"
            >
              <AiFillEdit size={20} />
            </button>
            <button
              onClick={() => onDelete(item)}
              className="text-red-500 hover:text-red-700"
            >
              <AiFillDelete size={20} />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
