'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            },
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = []
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k
          return ar
        }
      return ownKeys(o)
    }
    return function (mod) {
      if (mod && mod.__esModule) return mod
      var result = {}
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i])
      __setModuleDefault(result, mod)
      return result
    }
  })()
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const express_1 = __importDefault(require('express'))
const path_1 = __importDefault(require('path'))
const promises_1 = __importDefault(require('fs/promises'))
const vite_1 = require('vite')
const serialize_javascript_1 = __importDefault(require('serialize-javascript'))
const cookie_parser_1 = __importDefault(require('cookie-parser'))
const port = process.env.CLIENT_PORT || 80
const clientPath = path_1.default.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'
async function createServer() {
  const app = (0, express_1.default)()
  app.use((0, cookie_parser_1.default)())
  let vite
  if (isDev) {
    vite = await (0, vite_1.createServer)({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use(
      express_1.default.static(path_1.default.join(clientPath, 'dist/client'), {
        index: false,
      })
    )
  }
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      // Получаем файл client/index.html который мы правили ранее
      // Создаём переменные
      let render
      let template
      if (vite) {
        template = await promises_1.default.readFile(
          path_1.default.resolve(clientPath, 'index.html'),
          'utf-8'
        )
        // Применяем встроенные HTML-преобразования vite и плагинов
        template = await vite.transformIndexHtml(url, template)
        // Загружаем модуль клиента, который писали выше,
        // он будет рендерить HTML-код
        render = (
          await vite.ssrLoadModule(
            path_1.default.join(clientPath, 'src/entry-server.tsx')
          )
        ).render
      } else {
        template = await promises_1.default.readFile(
          path_1.default.join(clientPath, 'dist/client/index.html'),
          'utf-8'
        )
        // Получаем путь до сбилдженого модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path_1.default.join(
          clientPath,
          'dist/server/entry-server.cjs'
        )
        // Импортируем этот модуль и вызываем с инишл стейтом
        render = (
          await Promise.resolve(`${pathToServer}`).then(s =>
            __importStar(require(s))
          )
        ).render
      }
      // Получаем HTML-строку из JSX
      const { html: appHtml, initialState } = await render(req)
      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(
        `<!--ssr-initial-state-->`,
        `<script>window.APP_INITIAL_STATE = ${(0,
        serialize_javascript_1.default)(initialState, {
          isJSON: true,
        })}</script>`
      )
      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite === null || vite === void 0 ? void 0 : vite.ssrFixStacktrace(e)
      next(e)
    }
  })
  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`)
  })
}
createServer()
