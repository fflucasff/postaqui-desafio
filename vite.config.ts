import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // abre o navegador automaticamente ao rodar 'npm run dev'
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      // se quiser usar @ para src, descomente abaixo:
      // '@': '/src',
    },
  },
});
