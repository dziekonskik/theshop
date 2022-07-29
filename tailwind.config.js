module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      silver: "#F4F3FF",
      comfy: "#faf9ff",
      black: "#000000",
      purple: "#6C63FF",
      violet: "#8366f4",
      blue: "#007FFF",
      lightblue: "#77aaFF",
      midnight: "#3F3D56",
      metal: "#565584",
      platinium: "#E7E7E7",
      sunny: "#F4E13E",
      morning: "#E3E9E9",
      bermuda: "#A4E3D8",
      "bermuda-intense": "#78DCCA",
      "bubble-gum": "#FFB6B6",
      error: "#A50203",
    },
    extend: {
      fontFamily: {
        comfortaa: ["Comfortaa", "cursive"],
        anonymous: ["Anonymous Pro", "monospace"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out infinite",
        wiggleOnce: "wiggle 700ms 300ms ease-in-out",
        pulseOnce: "pulse 700ms 300ms ease-in-out 3",
      },
      dropShadow: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
