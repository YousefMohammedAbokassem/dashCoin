import React from "react";

export default function TableSkeleton() {
  return (
    <div className="animate-pulse w-full p-4">
      <table className="w-full text-sm text-left rtl:text-right border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            {[...Array(7)].map((_, index) => (
              <th
                key={index}
                className="px-6 py-4 text-center"
              >
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(20)].map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {[...Array(7)].map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-center">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}