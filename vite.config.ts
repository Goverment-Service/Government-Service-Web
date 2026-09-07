import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@site': __dirname,
      '@docusaurus': path.resolve(__dirname, './src/mocks/docusaurus'),
      '@theme': path.resolve(__dirname, './src/mocks/theme'),
    }
  }
})
