const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    "./src/**/*.vue",
    "./src/**/*.js",
  ],
  darkMode: "class",
  theme: {
    screens: {
      // c = video component
      'c-xs': '140px',
      'c-sm': '220px',
      'c-md': '400px',
      'c-lg': '520px',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
