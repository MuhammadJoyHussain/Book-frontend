import { Outlet } from 'react-router-dom'
import Nav from '../components/navbar'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export default function Layout() {
  return (
    <div>
      <ToastContainer />
      <Nav />
      <div className='pt-16'>
        <Outlet />
      </div>
    </div>
  )
}
