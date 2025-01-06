/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        "txt-white": "var(--color-txt-white)",
        "bg-black": "var(--color-bg-black)",
        yellow: "var(--color-yellow)",
        green: "var(--color-green)",
        red: "var(--color-red)",
        gray: "var(--color-gary)",
        lightgray: "var(--color-lightgray)",
        focus: "var(--color-focus)",
      },
      fontFamily: {
        teodor: ["var(--font-teodor)"],
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
