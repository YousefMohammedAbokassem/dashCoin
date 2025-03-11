import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#275963] text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <img src="/images/WHITE.png" alt="" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-3">{t("about_us")}</h3>
          <ul className="space-y-2 text-sm">
            <li>{t("marketing")}</li>
            <li>{t("services")}</li>
            <li>{t("branches")}</li>
            <li>{t("events")}</li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-3">{t("support")}</h3>
          <ul className="space-y-2 text-sm">
            <li>{t("help_center")}</li>
            <li>{t("privacy_policy")}</li>
            <li>{t("contact_us")}</li>
            <li>{t("site_map")}</li>
          </ul>
        </div>

        {/* Newsletter & Social Media */}
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-3">{t("newsletter")}</h3>
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder={t("enter_email")}
              className="w-full p-2 text-black rounded"
            />
            <button className="bg-white text-[#275963] px-4 py-2 rounded">
              {t("subscribe")}
            </button>
          </div>
          <h3 className="text-lg font-semibold mt-4 mb-3">
            {t("social_media")}
          </h3>
          <div className="flex space-x-4">
            <FaFacebookF className="cursor-pointer hover:text-gray-300" />
            <FaTwitter className="cursor-pointer hover:text-gray-300" />
            <FaLinkedinIn className="cursor-pointer hover:text-gray-300" />
            <FaInstagram className="cursor-pointer hover:text-gray-300" />
            <FaYoutube className="cursor-pointer hover:text-gray-300" />
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-8 border-t border-gray-600 pt-4">
        {t("all_rights_reserved")} © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
