/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/common/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Almoni DL AAA'],
    },
    extend: {
      colors: {
        primary: {
          bg: '#FFF8EE',
        },
      },
      text: {
        xxs: '.625rem',
        '3xl': '1.875rem',
      },
    },
  },
  plugins: [],
};
