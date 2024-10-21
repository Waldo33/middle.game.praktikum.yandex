import { createRoot } from 'react-dom/client'

import store from './store'
import { Provider } from 'react-redux'
import '../index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
