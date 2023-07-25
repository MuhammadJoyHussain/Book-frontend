import { useParams } from 'react-router-dom'
import { useGetBooksDetailsQuery } from '../../redux/slices/bookApiSlice'
import img from '../../assets/image.jpg'
import { useAppSelector } from '../../redux/hooks'
import jwt_decode from 'jwt-decode'
import { Button } from '@material-tailwind/react'

const BookDetails = () => {
  const { id: booksId } = useParams()

  const { data: product } = useGetBooksDetailsQuery(booksId)

  const { userInfo } = useAppSelector((state) => state.auth)

  const decodeToken = jwt_decode(userInfo.data.accessToken)

  const { _id } = decodeToken

  return (
    <div className='max-w-sm w-full lg:max-w-full lg:flex'>
      <div
        className='h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden'
        title='Woman holding a mug'
      ></div>
      <div className='border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
        <div className='mb-8'>
          <div className='text-gray-900 font-bold text-xl mb-2'>
            Title: {product?.data.title}
          </div>
          <p className='text-gray-700 text-base'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
          <div className='text-gray-700 text-md'>
            Genre: {product?.data.genre}
          </div>
        </div>
        <div className='flex items-center'>
          <img
            className='w-10 h-10 rounded-full mr-4'
            src={img}
            alt='Avatar of Jonathan Reinink'
          />
          <div className='text-sm'>
            <p className='text-gray-900 leading-none'>
              {product?.data.publisher.name}
            </p>
            <p className='text-gray-600'>{product?.data.publicationYear}</p>
          </div>
          <div>
            {_id === product?.data.user ? (
              <div className='ml-5'>
                <Button size='sm'>Edit</Button>
                <Button color='red' size='sm' className='ml-2'>
                  Delete
                </Button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails
