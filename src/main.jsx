import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import ErrorBoundry from './ErrorBoundry.jsx'

import Layout from './Layout.jsx'
import BoshSahifa from './BoshSahifa.jsx'
import Vazifalar from './Vazifalar.jsx'
import Tolovlarim from './Tolovlarim.jsx'
import Guruhlarim from './Guruhlarim.jsx'
import Korsatgichlarim from './Korsatgichlarim.jsx'
import KorsatgichDetails from './KorsatgichDetails.jsx'
import Reyting from './Reyting.jsx'
import Dokon from './Dokon.jsx'
import QoshimchaDarslar from './QoshimchaDarslar.jsx'
import Sozlamalar from './Sozlamalar.jsx'
import AuthPage from './AuthPage.jsx'

import NajotTalim from './NajotTalim.jsx'
import StudentPanel from './StudentPanel.jsx'
import AdminPanel from './AdminPanel.jsx'
import Kurslar from './Kurslar.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/portal" replace />,
    errorElement: <ErrorBoundry />,
  },

  { path: '/login', element: <AuthPage defaultMode="login" />, errorElement: <ErrorBoundry /> },
  { path: '/register', element: <AuthPage defaultMode="register" />, errorElement: <ErrorBoundry /> },

  {
    path: '/portal',
    element: <Layout />,
    errorElement: <ErrorBoundry />,
    children: [
      { index: true, element: <BoshSahifa /> },
      { path: 'vazifalar', element: <Vazifalar /> },
      { path: 'admin', element: <AdminPanel /> },
      { path: 'tolovlarim', element: <Tolovlarim /> },
      { path: 'guruhlarim', element: <Guruhlarim /> },
      { path: 'korsatgichlarim', element: <Korsatgichlarim /> },
      { path: 'korsatgichlarim/:id', element: <KorsatgichDetails /> },
      { path: 'reyting', element: <Reyting /> },
      { path: 'dokon', element: <Dokon /> },
      { path: 'qoshimcha-darslar', element: <QoshimchaDarslar /> },
      { path: 'sozlamalar', element: <Sozlamalar /> },
    ],
  },

  {
    path: '/landing',
    element: <App />,
    errorElement: <ErrorBoundry />,
  },

  {
    path: '/najot-talim',
    element: <NajotTalim />,
    errorElement: <ErrorBoundry />,
    children: [
      { index: true, element: <Navigate to="student" replace /> },
      { path: 'student', element: <StudentPanel /> },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        ),
      },
      { path: 'kurslar', element: <Kurslar /> },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
