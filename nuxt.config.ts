// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},

    //@ts-ignore
    build: {
        transpile: ['@vuepic/vue-datepicker']
    },

    css: ['@/assets/scss/app.scss'],

    plugins: ['~/plugins/bootstrap.client.ts'],

    modules: [
        '@pinia/nuxt',
        'nuxt-icon',
        'nuxt-rating'
    ],

    pinia: {
        autoImports: [
            'defineStore',
            ['defineStore', 'definePiniaStore'],
        ],
    },

    nitro: {
        plugins: ["~/server/index.ts"],
    },

    runtimeConfig: {
        mongodbUri: process.env.MONGODB_URI
    }
})
