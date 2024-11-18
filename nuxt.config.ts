// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: [
    '@nuxt/examples-ui',
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@vesp/nuxt-fontawesome', 'vue3-carousel-nuxt'],
    fontawesome: {
  icons: {
    brands: ['x-twitter', 'facebook', 'instagram', 'linkedin'],
    solid: ['plus', 'search', 'times', 'heart'],
    regular: ['heart'],
  }
}
})