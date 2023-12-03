/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        "chetwode-blue": {
          50: "#f1f3fc",
          100: "#e5e8fa",
          200: "#d1d4f4",
          300: "#b4b8ed",
          400: "#8a89e0",
          500: "#847cd8",
          600: "#7262c9",
          700: "#6351b1",
          800: "#51448f",
          900: "#443c73",
          950: "#282343",
        },
        "persian-blue": {
          50: "#edf3ff",
          100: "#dee8ff",
          200: "#c4d3ff",
          300: "#a1b6ff",
          400: "#7b8efe",
          500: "#5c68f8",
          600: "#3e3eed",
          700: "#312ed1",
          800: "#2b2aa9",
          900: "#2a2c85",
          950: "#19194d",
        },
      },
    },
  },
  plugins: [],
};
