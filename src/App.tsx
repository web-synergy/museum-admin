import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddEvent from './components/AddEvent/AddEvent'
import Contacts from './components/Contacts/Contacts'
import EditEvent from './components/EditEvent/EditEvent'
import EventList from './components/EventList/EventList'
import AuthLayout from './components/Login/AuthLayout'
import Login from './components/Login/Login'

import SuccessMessage from './components/Login/parts/SuccessMessage'
import ResetPassword from './components/Login/ResetPassword/ResetPassword'
import Settings from './components/Settings/Settings'
import SharedLayout from './components/SharedLayout/SharedLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <AddEvent />,
      },
      {
        path: '/events',
        element: <EventList />,
      },
      {
        path: '/events/:slug',
        element: <EditEvent />,
      },
      {
        path: '/contacts',
        element: <Contacts />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'reset',
        element: <ResetPassword />,
      },
      {
        path: 'success-message',
        element: <SuccessMessage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
