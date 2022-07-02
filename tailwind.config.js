module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      purple: "#3f3cbb",
      midnight: "#3F3D56",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      morning: "#E1EDED",
    },
    extend: {
      fontFamily: {
        acme: ["Acme", "serif"],
        anonymous: ["Anonymous Pro", "sans-serif"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
