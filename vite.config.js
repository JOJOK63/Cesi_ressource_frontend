import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test : {
    globals : true,
    environment : 'jsdom',
    setupFiles: './src/test/setup.js'
  },
  server: {
    host: true, // écouter sur toutes les interfaces réseau
    port: 5173,
  },
})
