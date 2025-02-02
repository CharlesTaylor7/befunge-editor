import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/befunge-editor/',
  esbuild: {
    keepNames: true,
  },
  resolve: {
    alias: {
      '@/styles': path.resolve(__dirname, './styles'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
