import { router } from '@processes/router'
import { RouterProvider } from 'react-router-dom'

export const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}
