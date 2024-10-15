import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests in development to your local backend
      '/api/v1': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'),

      }
    }
  },
  // define: {
  //   // You can expose the API URL to your frontend
  //   'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  // }
});

