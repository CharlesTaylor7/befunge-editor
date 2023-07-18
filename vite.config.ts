import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
