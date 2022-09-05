import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      "/api": {
        // target: "http://localhost:3000"
        target: "http://150.158.10.2:3000"
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue()],
})
