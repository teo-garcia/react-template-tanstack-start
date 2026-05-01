import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const shouldAnalyze = process.env.ANALYZE === 'true'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tanstackStart(),
    viteReact(),
    tsconfigPaths(),
    shouldAnalyze &&
      visualizer({
        brotliSize: true,
        filename: '.output/analyze/stats.html',
        gzipSize: true,
        open: false,
      }),
  ],
})
