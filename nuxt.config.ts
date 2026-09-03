// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxt/image'],
  css: ['~/assets/css/tailwind.css'],
  image: {
    domains: [
      'avatars.githubusercontent.com',
      'cdn.jsdelivr.net',
      'fastly.picsum.photos',
      'picsum.photos',
    ],
    format: ['webp'],
    quality: 80,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR',
      },
      titleTemplate: '%s | Atlas Profissionais',
      meta: [
        { name: 'theme-color', content: '#0891b2' },
        { name: 'application-name', content: 'Atlas Profissionais' },
        { name: 'apple-mobile-web-app-title', content: 'Atlas Profissionais' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
      ],
    },
  },
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
})
