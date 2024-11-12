import { Plugin } from 'vite'
import { readdirSync, writeFileSync, readFileSync } from 'fs'
import { buildSync } from 'esbuild'
import { join } from 'path'

function generateFileList(directory: string) {
  const files: string[] = []

  function traverse(dir: string) {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        traverse(fullPath)
      } else {
        files.push(fullPath.replace(`${directory}/`, ''))
      }
    }
  }

  traverse(directory)
  return files
}

function serviceWorkerBuildPlugin(): Plugin {
  return {
    name: 'Service Worker Build',
    apply: 'build',
    enforce: 'post',
    closeBundle() {
      const distDir = join(process.cwd(), 'dist')
      const files = generateFileList(distDir)

      const swPath = join(process.cwd(), 'service-worker.js')
      const swCode = readFileSync(swPath, 'utf-8')

      const updatedSwCode = swCode.replace(
        'self.__STATIC_RESOURCES = [];',
        `self.__STATIC_RESOURCES = ${JSON.stringify(files, null, 2)};`
      )

      const distSwPath = join(distDir, 'service-worker.js')
      writeFileSync(distSwPath, updatedSwCode)

      buildSync({
        entryPoints: [distSwPath],
        bundle: true,
        minify: true,
        outfile: join(distDir, 'service-worker.js'),
        allowOverwrite: true,
      })
    },
  }
}

export default serviceWorkerBuildPlugin
