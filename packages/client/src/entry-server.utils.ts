// packages/client/src/entry-server.utils.ts

import { PageInitContext } from '@app/router'
import { Request as ExpressRequest } from 'express'

export const createUrl = (req: ExpressRequest) => {
  const origin = `${req.protocol}://${req.get('host')}`

  return new URL(req.originalUrl || req.url, origin)
}

export const createContext = (req: ExpressRequest): PageInitContext => {
  const clientToken = req?.cookies?.token || ''
  if (!clientToken) {
    throw new Error('Token is required')
  }
  return {
    clientToken,
  }
}
export const createFetchRequest = (req: ExpressRequest) => {
  const url = createUrl(req)

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (!values) continue

    if (Array.isArray(values)) {
      for (const value of values) {
        headers.append(key, value)
      }
      continue
    }

    headers.set(key, values)
  }

  const init: {
    method: string
    headers: Headers
    signal: AbortSignal
    body?: any
  } = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}
