import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signin from './pages/client/signin'
import Signup from './pages/client/signup'
import ForgotPassword from './pages/client/forgot-password'
import AdminDashboard from './pages/admin/admin'
import UserDashBoard from './pages/admin/user'
import EditUser from './pages/admin/editUser'
import EventDashBoard from './pages/admin/event.jsx'
import EditEvent from './pages/admin/editEvent.jsx'
import ViewEvent from './pages/admin/detailEvent.jsx'
import SeatBooking from './pages/client/ticket.jsx'
import Index from './pages/client/index.jsx'
import MovieDetailPage from './pages/client/detail.jsx'

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/ticket/:id', 
    element: <SeatBooking />,
  },
  {
    path: '/detail/:id',
    element: <MovieDetailPage />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/user' ,
    element: <UserDashBoard />,
  },
  {
    path: '/admin/user/edit/:id', 
    element: <EditUser />,
  },
  {
    path: '/admin/event', 
    element: <EventDashBoard />,
  },
  {
    path: '/admin/event/edit/:id', 
    element: <EditEvent />,
  }, 
  {
    path: '/admin/event/:id', 
    element: <ViewEvent />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={routers} />
  </StrictMode>,
)
