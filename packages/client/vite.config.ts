import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import { VitePluginFonts } from 'vite-plugin-fonts'
import path, { join } from 'path'
import { buildSync } from 'esbuild'
import dotenv from 'dotenv'
dotenv.config()

function serviceWorkerBuildPlugin(): Plugin {
  return {
    name: 'Service Worker Build',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml() {
      buildSync({
        minify: true,
        bundle: true,
        entryPoints: [join(process.cwd(), 'service-worker.js')],
        outfile: join(process.cwd(), 'dist', 'service-worker.js'),
      })
    },
  }
}

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
        '@shared': path.resolve(__dirname, 'src/shared/'),
      },
    }),
    serviceWorkerBuildPlugin(),
  ],
})
