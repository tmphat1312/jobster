/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        pending: {
          text: colors.orange[500],
          bg: colors.orange[200],
        },
        interview: {
          text: colors.blue[500],
          bg: colors.blue[200],
        },
        declined: {
          text: colors.red[500],
          bg: colors.red[200],
        },
      },
    },
  },
  plugins: [],
}
