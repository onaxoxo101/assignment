import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Absolute base so client-routed deep links (/case-study/:slug) resolve
  // their assets correctly.
  base: '/',
})
