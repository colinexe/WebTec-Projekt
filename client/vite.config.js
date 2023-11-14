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
        target: "http://localhost:10000",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:10000",
        changeOrigin: true,
        secure: false,
      },
      "/gerichte": {
        target: "http://localhost:10000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
