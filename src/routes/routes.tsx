import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import BookDetails from '../pages/BookDetails/BookDetails'
import { Home } from '../pages/Home/Home'
import AddBook from '../pages/AddBook/AddBook'
import EditBook from '../pages/EditBook/EditBook'

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
        path: '/search/:searchTerm',
        element: <Home />,
      },
      {
        path: '/books/:id',
        element: <BookDetails />,
      },
      {
        path: '/add-book',
        element: <AddBook />,
      },
      {
        path: '/edit-book/:id',
        element: <EditBook />,
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
