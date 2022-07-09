module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      silver: "#F4F3FF",
      black: "#000000",
      purple: "#6C63FF",
      metal: "#565584",
      midnight: "#3F3D56",
      sunny: "#F4E13E",
      morning: "#E1EDED",
      bermuda: "#78dcca",
      "bubble-gum": "#FFB6B6",
      error: "#A50203",
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
      dropShadow: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
