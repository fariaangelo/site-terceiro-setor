import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      mangle: {
        keep_fnames: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});