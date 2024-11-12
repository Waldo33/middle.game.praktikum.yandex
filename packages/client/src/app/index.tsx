import { createRoot } from 'react-dom/client'

import store from './store'
import { Provider } from 'react-redux'
import '../index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { register } from 'register-service-worker'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

register('/service-worker.js')
