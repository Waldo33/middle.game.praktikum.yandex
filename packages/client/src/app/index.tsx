import { hydrateRoot } from 'react-dom/client'

import store from './store'
import { Provider } from 'react-redux'
import '../index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { register } from 'register-service-worker'

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

if (import.meta.env.MODE !== 'development') {
  register('/service-worker.js')
}
