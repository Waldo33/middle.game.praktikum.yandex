import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export const App = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <RouterProvider router={router} />
    </div>
  )
}
