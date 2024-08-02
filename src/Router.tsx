import { FC, useMemo } from 'react'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { HomePage } from './pages/HomePage'

export const getRoutes = () => (
  <>
    <Route index element={<HomePage />} />
    {/* <Route path="events">
    </Route> */}

    {/* <Route path="/*" element={<NotFoundPage />} /> */}
  </>
)

export const Router: FC = () => {
  const router = useMemo(() => {
    const routes = createRoutesFromElements(<Route path="/">{getRoutes()}</Route>)
    return createBrowserRouter(routes, {
      basename: '/',
    })
  }, [])

  return <RouterProvider router={router} />
}
