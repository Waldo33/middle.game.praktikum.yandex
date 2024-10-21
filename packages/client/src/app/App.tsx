import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import ErrorBoundary from '@shared/components/ErrorBoundary'

export const App = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </div>
  )
}
