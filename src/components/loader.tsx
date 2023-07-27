import { Spinner } from '@material-tailwind/react'

const Loader = () => {
  return (
    <div className='flex gap-2 justify-center'>
      Loading <Spinner />
    </div>
  )
}

export default Loader
