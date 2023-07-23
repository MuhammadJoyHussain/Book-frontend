import { Cards } from '../../components/cards'
import { useGetBooksQuery } from '../../redux/slices/bookApiSlice'

export function Home() {
  const { data: books } = useGetBooksQuery()

  return (
    <div className='flex justify-center'>
      <Cards books={books?.data ?? []} />
    </div>
  )
}
