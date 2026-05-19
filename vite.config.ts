import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

const shouldAnalyze = process.env.ANALYZE === 'true'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({
      include: /\.[jt]sx?$/,
      presets: [reactCompilerPreset()],
    }),
    tailwindcss(),
    shouldAnalyze &&
      visualizer({
        brotliSize: true,
        filename: '.output/analyze/stats.html',
        gzipSize: true,
        open: false,
      }),
  ],
})
