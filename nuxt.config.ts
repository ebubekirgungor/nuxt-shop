export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    authSecret: process.env.SECRET,
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  modules: ["@sidebase/nuxt-auth"],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
