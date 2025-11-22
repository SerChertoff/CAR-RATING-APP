import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // Base path for GitHub Pages (should match your repository name exactly, including case)
  base: '/CAR-RATING-APP/',
  plugins: [
    vue(),
    // Only enable devtools in development
    vueDevTools({
      enabled: import.meta.env.DEV,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Ensure proper chunking and asset handling
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
