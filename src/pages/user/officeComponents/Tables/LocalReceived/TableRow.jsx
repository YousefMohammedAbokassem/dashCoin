import React from "react";

export default function TableRow({ currentData }) {
  return (
    <>
      {currentData.map((item, index) => (
        <tr
          key={item.serial_number} // استخدام serial_number كـ key
          className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 text-center"
        >
          <td className="px-6 py-4">{item.serial_number}</td> {/* رقم تسلسلي */}
          <td className="px-6 py-4">{item.number_of_process}</td> {/* رقم العملية */}
          <td className="px-6 py-4">{item.full_name}</td> {/* الاسم الكامل */}
          <td className="px-6 py-4">{item.sender_phone_number}+</td> {/* رقم هاتف المرسل */}
          <td className="px-6 py-4">{item.amount}</td> {/* المبلغ */}
          <td className="px-6 py-4">{item.date}</td> {/* تاريخ العملية */}
          <td className="px-6 py-4">{item.time}</td> {/* وقت العملية */}
        </tr>
      ))}
    </>
  );
}
