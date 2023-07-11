// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},

    //@ts-ignore
    build: {
        transpile: ['@vuepic/vue-datepicker']
    },

    css: ['@/assets/scss/custom.scss'],

    plugins: ['~/plugins/bootstrap.js'],

    modules: [
        '@pinia/nuxt',
        'nuxt-icon',
        'nuxt-rating',
        'bootstrap-vue/nuxt'
    ],

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },

    bootstrapVue: {
        bootstrapCSS: false,
    },

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
