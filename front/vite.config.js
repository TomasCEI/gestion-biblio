import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// uso de path para el alias
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],


  // alias para los imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }



})
