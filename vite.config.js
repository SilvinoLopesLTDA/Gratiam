import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        "favicon-16x16.png",
        "favicon-32x32.png",
        "apple-touch-icon.png",
        "maskable-icon.png",
      ],
      manifest: {
        name: "Gratiam - Gerenciamento de Inventário",
        short_name: "Gratiam",
        description:
          'Sistema de inventário para controlar e gerir os produtos do armazém em tempo real e integrado para facilitar o desenvolvimento do seu negócio."',
        theme_color: "#ffffff",
        icons: [
          {
            src: "/favicon/favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
