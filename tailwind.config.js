/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    fontFamily: {
      InterBlack: ["InterBlack"],
      InterBold: ["InterBold"],
      InterExtraBold: ["InterExtraBold"],
      InterExtraLight: ["InterExtraLight"],
      Interlight: ["Interlight"],
      InterMedium: ["InterMedium"],
      InterRegular: ["InterRegular"],
      InterSemiBold: ["InterSemiBold"],
      InterThin: ["InterThin"],
    },
    backgroundColor: {
      primary: "#102E34",
      white: "#FFFFFF",
      "primary-dark": "#121212",
      "secondary-dark": "#5C5C5C",
    },
    borderColor: {
      white: "#FFFFFF",
      gray: "#EFEFEF",
      black: "#000000",
      "light-gray": "#C9CED8",
      "secondary-dark": "#5C5C5C",
    },
  },
  plugins: [],
};
