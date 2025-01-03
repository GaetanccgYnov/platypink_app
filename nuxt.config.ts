// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@vesp/nuxt-fontawesome', 'vue3-carousel-nuxt', '@nuxt/ui'],
  fontawesome: {
    icons: {
      brands: ['twitter', 'facebook', 'instagram', 'linkedin'],
      solid: ['plus', 'search', 'times', 'heart', 'arrow-right', 'arrow-left', 'phone', 'location-dot', 'star'],
      regular: ['heart', 'star', 'star-half-stroke'],
    }
  }
})