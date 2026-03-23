import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    mode === 'analyze' && visualizer({ filename: 'dist/stats.html', open: true, gzipSize: true, brotliSize: true }),
  ].filter(Boolean),
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
}))