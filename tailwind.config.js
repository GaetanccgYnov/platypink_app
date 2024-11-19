/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        bangers: ['Bangers', 'system-ui'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      colors: {
        'secondary': '#24A7A1',
        'tertiary': '#FF9810',
        'quaternary': '#562B35'
      }
    },
  },
  plugins: [],
  important: true,
}

