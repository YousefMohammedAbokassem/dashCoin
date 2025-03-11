"use client";

import { useState } from "react";
import { ChevronDownIcon, CalendarIcon } from "@heroicons/react/16/solid";
import {
  Field,
  Label,
  Switch,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
// import { useTranslation } from "@/i18n/client";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

const people = [
  {
    id: 1,
    gender: "male",
  },
  {
    id: 2,
    gender: "female",
  },
];

export default function FirstStep({
  lng,
  selected,
  setSelected,
  selectedDate,
  setSelectedDate,
  first_name,
  setFirst_name,
  last_name,
  setLast_name,
  national_id,
  setNational_id,
  place_of_birth,
  setPlace_of_birth,
  display_name,
  setDisplay_name,
}) {
  const { t } = useTranslation(lng);
  console.log(selected);
  return (
    <div className="">
      {/* الاسم الأول واسم العائلة */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          name="firstName"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
          placeholder={`${t("firstName")}`}
          className={`border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-3 py-5 w-1/2 focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]`}
        />
        <input
          type="text"
          name="lastName"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
          placeholder={`${t("lastName")}`}
          className={`border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-3 py-5 w-1/2 focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]`}
        />
      </div>
      {/* display name */}
      <div className="flex items-center mt-6">
        <input
          type="text"
          name="displayName"
          value={display_name}
          onChange={(e) => setDisplay_name(e.target.value)}
          placeholder={`${t("displayName")}`}
          className={`border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]`}
        />
      </div>

      {/* القائمة المنسدلة */}
      <div className="mt-6">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default text-start px-8 rounded-md  bg-transparent px-3 py-5  text-gray-900 dark:text-gray-200 shadow-sm border-[1px] border-[#CDCDCD]  focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]">
              <span className="block truncate"> {t(`${selected.gender}`)}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon
                  className="w-5 h-5 text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute bg-[#FFFFFF] dark:bg-[#111518] z-10 mt-1 max-h-60 w-full text-left overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {people.map((person) => (
                <Listbox.Option
                  key={person.id}
                  value={person}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-[#275963] text-white dark:bg-[#E1B145] dark:text-black"
                        : "text-gray-900 dark:text-gray-200"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate capitalize ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {t(`${person.gender}`)}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#275963] dark:text-[#E1B145]">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* الرقم الوطني */}
      <div className="flex items-center gap-4 mt-6">
        <input
          type="text"
          name="national_id"
          value={national_id}
          onChange={(e) => setNational_id(e.target.value)}
          placeholder={`${t("national_number")}`}
          className={`border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]`}
        />
      </div>

      {/* مكان الولادة */}
      <div className="flex items-center gap-4 mt-6">
        <input
          type="text"
          name="place_of_birth"
          value={place_of_birth}
          onChange={(e) => setPlace_of_birth(e.target.value)}
          placeholder={`${t("birth_place")}`}
          className={`border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]`}
        />
      </div>

      {/* تاريخ الولادة */}
      <div className="relative w-full mt-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <CalendarIcon className="w-5 h-5 text-[#275963] dark:text-[#E1B145]" />
        </div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText={`${t("birthDate")}`}
          dateFormat="dd/MM/yyyy"
          className="bg-transparent border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md px-3 py-5 pl-10 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]"
          popperClassName="react-datepicker-popper"
          calendarClassName="react-datepicker"
          dayClassName={() =>
            "hover:bg-[#275963] hover:text-white dark:hover:bg-[#E1B145] dark:hover:text-black"
          }
        />
      </div>
    </div>
  );
}
