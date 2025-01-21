/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        main: "var(--color-main)",
        "main-hover": "var(--color-main-hover)",
        "main-inactive": "var(--color-main-inactive)",

        "title-white": "var(--color-title-white)",
        "txt-white": "var(--color-txt-white)",
        "bg-black": "var(--color-bg-black)",
        "border-black": "var(--color-border-black)",
        gray: "var(--color-gary)",

        green: "var(--color-green)",
        red: "var(--color-red)",
      },
      fontFamily: {
        sf: ["var(--font-sf)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
