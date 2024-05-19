const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
        blue: colors.lightBlue,
        yellow: colors.amber,
        red: colors.rose,
        green: colors.green,
        purple: colors.purple,
        orange: colors.orange,
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
