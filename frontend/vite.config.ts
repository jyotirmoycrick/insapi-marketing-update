import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'localhost',
      '6c68ec4c-1fed-49a7-bd1f-341ac1a1f1ad.preview.emergentagent.com',
      '.emergentagent.com',
      '.preview.emergentagent.com',
      '.preview.emergentcf.cloud'
    ],
  },
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'sonner'],
        },
      },
    },
    // Enable source maps for debugging
    sourcemap: false,
    // Minify for production
    minify: 'terser',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  },
  // File types to support raw imports
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.png', '**/*.webp', '**/*.jpg'],
})
