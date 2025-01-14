// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  build: {
    transpile: ['vuetify'],
  },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['./assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },
  vite: {
    resolve: {
      alias: {
        '#app-manifest': './node_modules/nuxt/dist/app/composables/manifest.js',
      },
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.VITE_API_URL || '',
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://httpbin.org',
        changeOrigin: true,
        prependPath: true
      }
    }
  }
});
