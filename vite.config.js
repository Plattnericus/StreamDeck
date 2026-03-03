import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  publicDir: 'static',
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
