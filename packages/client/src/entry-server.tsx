import React from 'react'
import ReactDOM from 'react-dom/server'
import './index.css'
import { reducer } from './app/store'
import { Request as ExpressRequest } from 'express'

import { Provider } from 'react-redux'

import { routes } from './app/router'
import { configureStore } from '@reduxjs/toolkit'
import {
  createContext,
  createFetchRequest,
  createUrl,
} from './entry-server.utils'
import { matchRoutes } from 'react-router-dom'

import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { setPageHasBeenInitializedOnServer } from './slices/ssrSlice'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const store = configureStore({
    reducer,
  })

  // 1.
  const url = createUrl(req)

  // 2.
  const foundRoutes = matchRoutes(routes, url)
  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }

  // 3.
  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  try {
    await fetchData({
      dispatch: store.dispatch,
      state: store.getState(),
      ctx: createContext(req),
    })
  } catch (e) {
    console.log('Инициализация страницы произошла с ошибкой', e)
  }
  const router = createStaticRouter(dataRoutes, context)

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider context={context} router={router} />
      </Provider>
    ),
    initialState: store.getState(),
  }
}
