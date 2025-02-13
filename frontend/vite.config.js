import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window", // ✅ { } 대신 : 사용
  },
  server: {
    proxy: {
      "/api": {
        target: "http://i12d105.p.ssafy.io:8081",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
