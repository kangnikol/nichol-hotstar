/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'body-bg': '#0B1120',
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
