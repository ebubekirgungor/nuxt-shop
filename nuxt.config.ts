export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    authSecret: process.env.SECRET,
  },
  modules: ["@sidebase/nuxt-auth"],
});
