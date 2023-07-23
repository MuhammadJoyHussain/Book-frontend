import { Outlet } from 'react-router-dom'
import Nav from '../components/navbar'

export default function Layout() {
  return (
    <div>
      <Nav />
      <div className='pt-16'>
        <Outlet />
      </div>
    </div>
  )
}
