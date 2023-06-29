// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  //@ts-ignore
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },

  modules: ['@pinia/nuxt'],

  nitro: {
    plugins: ["~/server/index.ts"],
  },

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI
  }
})
