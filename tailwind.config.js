/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#f2f1ff', 100: '#e8e6ff', 500: '#7568ee', 600: '#6254dc', 700: '#5143c1' },
      },
      boxShadow: { soft: '0 10px 35px rgba(33, 35, 75, 0.06)' },
    },
  },
  plugins: [],
};
