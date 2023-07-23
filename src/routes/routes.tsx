import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import BookDetails from '../pages/BookDetails/BookDetails'
import { Home } from '../pages/Home/Home'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books/:id',
        element: <BookDetails />,
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default routes
