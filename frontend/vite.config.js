import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'; //  Import PWA plugin
import react   from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      devOptions: { enabled: true },

    registerType: 'autoUpdate', // Automatically update the service worker
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      id: '/',
      name: 'Job Application Tracker',
      short_name: 'Job Tracker',
      description: 'Track your job applications with ease',
      theme_color: '#007bff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      screenshots: [
        {
          src: 'screenshot-1.png',
          sizes: '512x512',
          type: 'image/png',
          label: 'Application list view'
        },
        {
          src: 'screenshot-2.png',
          sizes: '512x512',
          type: 'image/png',
          label: 'Add new application'
        }
      ]
    }
  })
  ],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', //
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
