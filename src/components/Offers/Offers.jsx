import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EyeIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
export default function Offers() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [Offers, setOffers] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}get_products/discount?perPage=8`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setOffers(res.data?.data?.data || []);
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="pt-12 container mx-auto">
      <div className="flex justify-between items-center text-[#1D1D1D] mb-6">
        <span className="font-bold text-lg">{t("modernProducts")}</span>
      </div>
      {/*  */}
      {/* map here */}
      <div className="modern">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 h-[400px] rounded-[8px]"
              />
            ))
          : Offers?.map((item, i) => (
              <div key={i} className=" h-[400px] rounded-[8px] pb-5 flex flex-col">
                <div className="image flex-1">
                  <img
                    src={`${import.meta.env.VITE_API_URL_IMAGE}${item.image}`}
                    className="w-full h-full"
                    alt={item.name}
                  />
                </div>
                <div className="p-2">
                  <div className="show flex items-center justify-between my-2">
                    <div className="reviews">
                      <span className="opacity-50">
                        {item?.number_of_reviews} {t("reviews")}
                      </span>
                    </div>
                  </div>
                  {/* type */}
                  <p className="type my-2 font-semibold text-md">
                    {item?.name}
                  </p>
                  <p className="priceLocal my-2">
                  السعر الوطني:

                    {item?.discount ? (
                      <>
                        <del className="text-red-500">
                          {parseFloat(item?.price_in_country)} 
                        </del>
                        <p className="ml-2">
                          {(
                            parseFloat(item?.price_in_country) *
                            (1 - item?.discount / 100)
                          )}{" "}
                          
                        </p>
                      </>
                    ) : (
                      <span>{item?.price_in_country} LSL</span>
                    )}
                  </p>

                  <p className="priceInter my-2 text-[#275963]">
                    السعر الدولي:
                    {item?.discount ? (
                      <>
                        <del className="text-red-500">
                          {parseFloat(item?.price_in_hun)} SNC
                        </del>
                        <p className="ml-2">
                          {(
                            parseFloat(item?.price_in_hun) *
                            (1 - item?.discount / 100)
                          )}{" "}
                          SNC
                        </p>
                      </>
                    ) : (
                      <span>{item?.price_in_hun} SNC</span>
                    )}
                  </p>

                  <div className="flex justify-between items-center gap-2">
                    <button
                      className="bg-[#275963] rounded-sm flex-1 h-[30px] text-white font-bold"
                      type="button"
                    >
                      {t("shopNow")}
                    </button>
                    <svg
                      className="bg-[#275963] p-1 rounded-sm"
                      width="30"
                      height="30"
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.43437 3.34298C3.86449 3.14262 3.24011 3.44217 3.03975 4.01203C2.8394 4.5819 3.13894 5.20629 3.70882 5.40664L4.08975 5.54057C5.06335 5.88287 5.70319 6.10971 6.174 6.34073C6.61621 6.5577 6.81114 6.73332 6.93956 6.92125C7.07119 7.11388 7.17284 7.37845 7.2302 7.90833C7.29022 8.46281 7.29171 9.18499 7.29171 10.2641V14.0582C7.29171 18.348 7.38392 19.7636 8.64743 21.0964C9.91093 22.429 11.9445 22.429 16.0117 22.429H23.7451C26.0215 22.429 27.1598 22.429 27.9643 21.7734C28.7689 21.1177 28.9987 20.0029 29.4582 17.7733L30.1871 14.2372C30.6933 11.7011 30.9465 10.433 30.299 9.59144C29.6516 8.74986 27.4396 8.74986 24.9823 8.74986H9.46833C9.45857 8.35563 9.44007 7.99697 9.40499 7.67293C9.32664 6.94904 9.15686 6.28882 8.74564 5.68706C8.33121 5.0806 7.78018 4.69218 7.13759 4.37689C6.53664 4.08202 5.773 3.81357 4.87391 3.4975L4.43437 3.34298ZM18.9587 12.0311C19.5627 12.0311 20.0524 12.5208 20.0524 13.1249V14.9478H21.8753C22.4794 14.9478 22.9691 15.4375 22.9691 16.0415C22.9691 16.6456 22.4794 17.1353 21.8753 17.1353H20.0524V18.9582C20.0524 19.5622 19.5627 20.0519 18.9587 20.0519C18.3546 20.0519 17.8649 19.5622 17.8649 18.9582V17.1353H16.042C15.438 17.1353 14.9483 16.6456 14.9483 16.0415C14.9483 15.4375 15.438 14.9478 16.042 14.9478H17.8649V13.1249C17.8649 12.5208 18.3546 12.0311 18.9587 12.0311Z"
                        fill="white"
                      />
                      <path
                        d="M10.9375 26.25C12.1456 26.25 13.125 27.2294 13.125 28.4375C13.125 29.6456 12.1456 30.625 10.9375 30.625C9.72937 30.625 8.75 29.6456 8.75 28.4375C8.75 27.2294 9.72937 26.25 10.9375 26.25Z"
                        fill="white"
                      />
                      <path
                        d="M24.0625 26.25C25.2706 26.25 26.25 27.2293 26.25 28.4375C26.25 29.6456 25.2706 30.625 24.0625 30.625C22.8544 30.625 21.875 29.6456 21.875 28.4375C21.875 27.2293 22.8544 26.25 24.0625 26.25Z"
                        fill="white"
                      />
                    </svg>
                    {/* <span className="">
            </span> */}
                  </div>
                </div>
              </div>
            ))}
      </div>
      {/*  */}
      <button
        type="button"
        className="more border-solid border border-[#CDCDCD] block w-full mt-10 p-4 font-bold text-xl cursor-pointer rounded-md text-[#275963]"
      >
        {t("more")}
      </button>
    </div>
  );
}
