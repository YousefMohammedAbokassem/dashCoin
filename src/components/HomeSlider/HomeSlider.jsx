import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "./styles.scss";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import axios from "axios";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";

export default function HomeSlider() {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const dispatch = useDispatch();
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}banners`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setBanners(res.data?.data);
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
    <Swiper
      pagination={{ dynamicBullets: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      effect="fade"
      loop={true}
      modules={[Pagination, Autoplay, EffectFade]}
      className="mySwiper HomeSwiper"
      dir="rtl"
    >
      {loading
        ? Array(3)
            .fill(null)
            .map((_, index) => (
              <SwiperSlide key={index} className="swiperSlide">
                <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded-lg"></div>
              </SwiperSlide>
            ))
        : banners.map((banner) => (
            <SwiperSlide key={banner.id} className="swiperSlide">
              <img
                src={`${import.meta.env.VITE_API_URL_IMAGE}${banner.image}`}
                alt=""
                className="w-full h-[300px] object-cover rounded-lg"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
    </Swiper>
  );
}
