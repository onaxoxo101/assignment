import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

/**
 * Builds the whole app into one self-contained HTML document, for publishing
 * as a hosted preview. Fonts are inlined as data URIs so the page needs no
 * external requests.
 */
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  define: { __OMIT_ASSETS__: 'true' },
  build: {
    outDir: 'dist-artifact',
    assetsInlineLimit: 100 * 1024 * 1024,
    cssCodeSplit: false,
    rollupOptions: { input: 'artifact/index.html' },
  },
})
