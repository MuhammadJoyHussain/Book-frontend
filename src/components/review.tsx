import { Button } from '@material-tailwind/react'
import {
  useCreateReviewMutation,
  useGetReviewQuery,
} from '../redux/slices/reviewApiSlice'
import { useAppSelector } from '../redux/hooks'
import { useState } from 'react'
import Loader from './loader'

interface ReviewProps {
  bookId: string | undefined
}

const Reviews = ({ bookId }: ReviewProps) => {
  const [review, setReview] = useState('')

  const [createBook, { isLoading }] = useCreateReviewMutation()

  const { data: reviews, refetch } = useGetReviewQuery()

  const { userInfo } = useAppSelector((state) => state.auth)

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    createBook({
      data: { review, book: bookId },
      accessToken: userInfo.data.accessToken,
    })

    refetch()
  }

  return (
    <section className='bg-white dark:bg-gray-900 py-8 lg:py-16'>
      <div className='max-w-2xl mx-auto px-4'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
            Reviews
          </h2>
        </div>
        <form onSubmit={submitHandler} className='mb-6'>
          <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
            <label htmlFor='comment' className='sr-only'>
              Your comment
            </label>
            <textarea
              id='comment'
              rows={6}
              onChange={(e) => setReview(e.target.value)}
              className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
              placeholder='Write a comment...'
              required
            ></textarea>
          </div>
          <Button type='submit'>Post comment</Button>
        </form>
        <>
          {isLoading ? (
            <Loader />
          ) : (
            reviews?.data.map((r) => (
              <div key={r._id}>
                {bookId === r.book ? (
                  <article className='p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900'>
                    <footer className='flex justify-between items-center mb-2'>
                      <div className='flex items-center'>
                        <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
                          <img
                            className='mr-2 w-6 h-6 rounded-full'
                            src='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
                            alt='Michael Gough'
                          />
                          {r.user.name}
                        </p>
                      </div>

                      <div
                        id='dropdownComment1'
                        className='hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
                      ></div>
                    </footer>
                    <p className='text-gray-500 dark:text-gray-400'>
                      {r.review}
                    </p>
                  </article>
                ) : (
                  ''
                )}
              </div>
            ))
          )}
        </>
      </div>
    </section>
  )
}

export default Reviews
