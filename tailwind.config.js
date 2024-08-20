// import Background from 'hero-slider/dist/components/Slide/Background';

import Background from "hero-slider/dist/components/Slide/Background";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "dark-custom": "#181616",
      },
    },
  },
  plugins: [],
};
