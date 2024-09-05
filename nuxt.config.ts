// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        { rel: "manifest", href: "/favicon/site.webmanifest" },
        {
          rel: "mask-icon",
          href: "/favicon/safari-pinned-tab.svg",
          color: "#5bbad5",
        },
        { rel: "shortcut icon", href: "/favicon/favicon.ico" },
      ],
      meta: [
        { name: "msapplication-TileColor", content: "#ffffff" },
        { name: "msapplication-config", content: "/favicon/browserconfig.xml" },
        { name: "theme-color", content: "#ffffff" },
      ],
    },
  },

  compatibilityDate: "2024-04-03",

  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@vueuse/nuxt"],
  image: {
    inject: true,
  },
  plugins: ["~/plugins/gsap.client.ts"],

  runtimeConfig: {
    emailHost: process.env.EMAIL_HOST,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,

    public: {
      strapi: {
        url: process.env.STRAPI_URL,
      },
    },
  },
});
