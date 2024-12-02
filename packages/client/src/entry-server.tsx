import React from 'react'
import ReactDOM from 'react-dom/server'
import './index.css'
import { reducer } from './app/store'
import { Request as ExpressRequest } from 'express'
import { toast } from '@shared/hooks/use-toast'

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

  const url = createUrl(req)
  const foundRoutes = matchRoutes(routes, url)
  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }
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
    toast({
      description: 'Инициализация страницы произошла с ошибкой',
      variant: 'destructive',
    })
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
