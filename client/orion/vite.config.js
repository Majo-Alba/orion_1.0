import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"

// new jul04
// const manifestForPlugin = {
//   manifest: {
//     name:"Orion",
//     short_name:"Orion",
//     icons:[{
//       src:'./src/assets/images/android-chrome-192x192.png',
//       sizes:'192x192',
//       type:'image/png',
//       purpose:'favicon'
//     },
//     {
//       src:'./src/assets/images/android-chrome-512x512.png',
//       sizes:'512x512',
//       type:'image/png',
//       purpose:'favicon'
//     },
//     {
//       src:'./src/assets/images/apple-touch-icon.png',
//       sizes:'180x180',
//       type:'image/png',
//       purpose:'apple touch icon'
//     }]
//   }
// }
// end jul04

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType:'autoUpdate',
      manifest: {
        name:'Orion',
        short_name:'Orion',
        description:'ERP Orion',
        theme_color:'#ffffff',
        icons: [{
          src:'/android-chrome-192x192.png',
          sizes:'192x192',
          type:'image/png',
          purpose:'any'
        },
        {
          src:'/android-chrome-512x512.png',
          sizes:'512x512',
          type:'image/png',
          purpose:'any'
        },
        {
          src:'/apple-touch-icon.png',
          sizes:'180x180',
          type:'image/png',
          purpose:'any'
        },
        ]
      }
    })
  ],
})
