// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  devtools: { enabled: true },

  //@ts-ignore
  nitro: {
    plugins: ["~/server/index.ts"],
  },

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI
  }
})
