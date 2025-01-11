// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  build: {
    transpile: ["vuetify"],
  },
  modules: ["vuetify-nuxt-module"],
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
        "#app-manifest": "./node_modules/nuxt/dist/app/composables/manifest.js",
      },
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || "",
    },
  },
});