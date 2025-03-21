import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import { VitePluginFonts } from 'vite-plugin-fonts'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
import serviceWorkerBuildPlugin from './serviceWorkerBuildPlugin'

const isDev = process.env.NODE_ENV === 'development'
const proxy = isDev
  ? {
      '/api': {
        target: process.env.API_URL,
        secure: false,
        changeOrigin: true,
        configure: (proxy, options) => {
          options.cookieDomainRewrite = {
            '*': '',
          }
        },
      },
    }
  : {}

export default defineConfig({
  build: {
    outDir: path.join(__dirname, 'dist/client'),
  },
  ssr: {
    format: 'cjs' as unknown as undefined,
  },
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    proxy,
  },
  define: {
    __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
    __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
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
        '@shared': path.resolve(__dirname, 'src/shared/'),
      },
    }),
    serviceWorkerBuildPlugin(),
  ],
})
