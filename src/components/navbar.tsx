import { useState, useEffect } from 'react'
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../redux/slices/userApiSlices'
import { logout } from '../redux/slices/authSlice'

export default function Nav() {
  const [openNav, setOpenNav] = useState(false)

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  const { userInfo } = useAppSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Navbar className='mx-auto max-w-screen-xl px-4 py-2'>
      <div className='flex items-center justify-between text-blue-gray-900'>
        <Typography
          as='a'
          href='#'
          variant='h6'
          className='mr-4 cursor-pointer py-1.5 lg:ml-2'
        >
          Material Tailwind
        </Typography>
        <div className='hidden lg:block'></div>
        <div className='hidden gap-2 lg:flex'>
          {userInfo ? (
            <Button
              onClick={logoutHandler}
              variant='text'
              size='sm'
              color='blue-gray'
            >
              Logout
            </Button>
          ) : (
            <>
              <Link to='/login'>
                <Button variant='text' size='sm' color='blue-gray'>
                  Login
                </Button>
              </Link>

              <Link to='/signup'>
                <Button variant='gradient' size='sm'>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        <IconButton
          variant='text'
          color='blue-gray'
          className='lg:hidden'
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className='h-6 w-6' strokeWidth={2} />
          ) : (
            <Bars3Icon className='h-6 w-6' strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className='flex w-full flex-nowrap items-center gap-2 lg:hidden'>
          {userInfo ? (
            <Button
              onClick={logoutHandler}
              variant='text'
              size='sm'
              color='blue-gray'
            >
              Logout
            </Button>
          ) : (
            <>
              <Link to='/login'>
                <Button variant='text' size='sm' color='blue-gray'>
                  Login
                </Button>
              </Link>

              <Link to='/signup'>
                <Button variant='gradient' size='sm'>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  )
}
