/** @type {import("tailwindcss").Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'orange-fruit': '#c5948c',
        'orange-tomato': '#e7b382',
        'green-banana': '#85DCB9',
        'sea-mood': '#81BECE',
        'deep-sea': '#378BA4'
      }
    }
  },
  plugins: []
}
