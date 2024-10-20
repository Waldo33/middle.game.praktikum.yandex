import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import { VitePluginFonts } from 'vite-plugin-fonts'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    react(),
    VitePluginFonts({
      google: {
        families: [
          {
            name: 'Inter',
            styles: 'ital,opsz,wght@0,14..32,100..900;1,14..32,100..900',
          },
        ],
      },
    }),
    alias({
      entries: {
        '@app': path.resolve(__dirname, 'src/app/'),
        '@processes': path.resolve(__dirname, 'src/processes/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),
        '@widgets': path.resolve(__dirname, 'src/widgets/'),
        '@features': path.resolve(__dirname, 'src/features/'),
        '@entities': path.resolve(__dirname, 'src/entities/'),
        '@shared': path.resolve(__dirname, 'src/shared/'),
      },
    }),
  ],
})
