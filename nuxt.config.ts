// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      socketPort: 3001,
      url: 'http://localhost'
    }
  },
  modules: [
    '@pinia/nuxt'
  ],
  pinia: {
    autoImports: [
      'defineStore',
    ],
  },
  imports: {
    dirs: ['./stores']
  },
  plugins: [
    './plugins/socket.io'
  ],
  nitro: {
    plugins: [
      './plugins/socket.io.server',
    ]
  },
  typescript: {
    strict: true
  },
  css: ['~/assets/css/style.scss']
})
