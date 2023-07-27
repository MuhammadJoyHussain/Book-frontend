import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useDeleteBookMutation,
  useGetBooksDetailsQuery,
} from '../../redux/slices/bookApiSlice'
import img from '../../assets/image.jpg'
import { useAppSelector } from '../../redux/hooks'
import jwt_decode from 'jwt-decode'
import { Button } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import Reviews from '../../components/review'
import Loader from '../../components/loader'

const BookDetails = () => {
  const { id: booksId } = useParams()

  const { data: book } = useGetBooksDetailsQuery(booksId)

  const [deleteBook, { isLoading }] = useDeleteBookMutation()

  const { userInfo } = useAppSelector((state) => state.auth)

  const decodeToken: { _id?: string } = userInfo?.data
    ? jwt_decode(userInfo?.data.accessToken)
    : {}

  const { _id } = decodeToken

  console.log(_id)

  const navigate = useNavigate()

  const deleteHandler = async () => {
    if (window.confirm('Are you sure')) {
      try {
        deleteBook({ booksId, accessToken: userInfo.data.accessToken })
        navigate('/')
        toast('Book deleted successfully')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='max-w-sm w-full lg:max-w-full lg:flex'>
            <div
              className='h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden'
              title='Woman holding a mug'
            ></div>
            <div className='border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
              <div className='mb-8'>
                <div className='text-gray-900 font-bold text-xl mb-2'>
                  Title: {book?.data.title}
                </div>
                <p className='text-gray-700 text-base'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
                <div className='text-gray-700 text-md'>
                  Genre: {book?.data.genre}
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
                    {book?.data.publisher.name}
                  </p>
                  <p className='text-gray-600'>{book?.data.publicationYear}</p>
                </div>
                <div>
                  {userInfo?.data && _id === book?.data.user ? (
                    <div className='ml-5'>
                      <Link to={`/edit-book/${book.data._id}`}>
                        <Button size='sm'>Edit</Button>
                      </Link>
                      <Button
                        onClick={deleteHandler}
                        color='red'
                        size='sm'
                        className='ml-2'
                      >
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
          {/* Review area */}
          <Reviews bookId={booksId} />
        </>
      )}
    </div>
  )
}

export default BookDetails
