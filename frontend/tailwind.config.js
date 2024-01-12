/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // added new 4 column grid as new4
        'box': 'repeat(auto-fit,minmax(300px,400px))'
        }
    },
  },
  plugins: [],
}