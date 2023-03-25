/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: '2rem',
        sm: '4rem',
        md: '2rem',
        lg: '2rem',
        xl: '4rem',
        '2xl': '7rem'
      },
    },
    extend: {

    },
  },
  plugins: [],
}