/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true, // لجعل الـ container في المنتصف
        padding: "1rem", // يمكنك تعديل الـ padding حسب الحاجة
        screens: {
          // sm: "640px",
          // md: "768px",
          // lg: "1024px",
          xl: "1280px",
          "2xl": "1440px", // أكبر من القيمة الافتراضية (1536px)
          "3xl": "1600px", // يمكنك إضافة حجم جديد إذا أردت
        },
      },
    },
  },
  plugins: [],
};
