import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "localhost:8081",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     "/ws": {
  //       target: "http://i12d105.p.ssafy.io:8081",
  //       ws: true, 
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // }
})
