import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../build/client/",
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/test": {
        target: "http://localhost:15000",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:15000",
        changeOrigin: true,
        secure: false,
      },
      "/gerichte": {
        target: "http://localhost:15000",
        changeOrigin: true,
        secure: false,
      },
      "/workouts": {
      target: "http://localhost:15000",
      changeOrigin: true,
      secure: false,
      },
      "/journals":{
        target: "http://localhost:15000",
      changeOrigin: true,
      secure: false,
      },
      "/auth": {
        target: "http://localhost:15000",
        changeOrigin: true,
        secure: false,
        },
      "/logout": {
        target: "http://localhost:15000",
        changeOrigin: true,
        secure: false,
        }
    },
  },
})
