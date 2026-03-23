import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Only generate the bundle report when ANALYZE=true
    mode === 'analyze' && visualizer({
      filename: 'dist/bundle-report.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    // Use terser for better dead-code elimination and minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // No source maps in production
    sourcemap: false,
    // Raise the warning threshold to 600kb (Vite default is 500kb)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split vendor code into separate cacheable chunks
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // React runtime in its own chunk
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-react'
            }
            // Everything else from node_modules goes into a shared vendor chunk
            return 'vendor'
          }
        },
        // Deterministic file names with content hashes for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
}))
