import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
//import {visualizer} from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),VitePWA({
      registerType : 'autoUpdate',
      devOptions : {
        enabled : true,
      },
      manifest : {
        name : "Music App",
        theme_color : "#ff5e3a",
        icons: [
          {
            src: "assets/img/pwa-192x192.png",
            sizes : "192x192",
            type : "img/png",
          },
          //it may be the solution to avoid erreur in console application
          // "screenshots": [
          //   {
          //     "src": "screenshot1.jpg",
          //     "sizes": "1920x1080",
          //     "type": "image/jpeg"
          //   },
          //   {
          //     "src": "wide-screenshot.jpg",
          //     "sizes": "1920x1080",
          //     "type": "image/jpeg",
          //     "form-factor": "wide"
          //   }
        ]
      },
      workbox : {
        globPatterns : ["**/*.{js,css,html,png,jpg,}"],
      }
    }),
    //visualizer({open : true}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
