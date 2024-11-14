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
        'primary': '#24A7A1',
        'secondary': '#FF9810',
        'tertiary': '#562B35'
      }
    },
  },
  plugins: [],
}

