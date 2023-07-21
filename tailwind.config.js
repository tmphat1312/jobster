/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-50": "#eff6ff",
        "primary-100": "#dbeafe",
        "primary-200": "#bfdbfe",
        "primary-300": "#93c5fd",
        "primary-400": "#60a5fa",
        "primary-500": "#3b82f6",
        "primary-600": "#2563eb",
        "primary-700": "#1d4ed8",
        "primary-800": "#1e40af",
        "primary-900": "#1e3a8a",
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
