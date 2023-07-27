import { Button } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useCreateBookMutation } from '../../redux/slices/bookApiSlice'
import { useAppSelector } from '../../redux/hooks'
import { toast } from 'react-toastify'
import Loader from '../../components/loader'

const AddBook = () => {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [publicationYear, setPublicationYear] = useState('')

  const [formSubmitted, setFormSubmitted] = useState(false)

  const { userInfo } = useAppSelector((state) => state.auth)

  const [createBook, { isLoading }] = useCreateBookMutation()

  useEffect(() => {
    if (formSubmitted) {
      setTitle('')
      setGenre('')
      setName('')
      setLocation('')
      setPublicationYear('')
      setFormSubmitted(false)
    }
  }, [formSubmitted])

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const publisher = { name, location }

    const book = {
      title,
      genre,
      publisher,
      publicationYear,
    }

    try {
      await createBook({ data: book, accessToken: userInfo.data.accessToken })
      setFormSubmitted(true)

      toast('Book added Sucessfully')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Add A Book
            </h2>
          </div>

          <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form
              onSubmit={submitHandler}
              className='space-y-6'
              action='#'
              method='POST'
            >
              <div>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Title
                </label>
                <div className='mt-2'>
                  <input
                    id='title'
                    name='title'
                    type='title'
                    onChange={(e) => setTitle(e.target.value)}
                    autoComplete='title'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Author Name
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    id='name'
                    name='name'
                    type='name'
                    onChange={(e) => setName(e.target.value)}
                    autoComplete='name'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='location'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Author Location
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    id='location'
                    name='location'
                    type='location'
                    onChange={(e) => setLocation(e.target.value)}
                    autoComplete='location'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='genre'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Genre
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    id='genre'
                    name='genre'
                    type='genre'
                    onChange={(e) => setGenre(e.target.value)}
                    autoComplete='genre'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='publicationDate'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Publication Date
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    id='publicationDate'
                    name='publicationDate'
                    type='publicationDate'
                    onChange={(e) => setPublicationYear(e.target.value)}
                    autoComplete='publicationDate'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <Button
                  type='submit'
                  className='flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AddBook
