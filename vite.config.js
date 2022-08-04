import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
  plugins: [vue()]
})
