import { useParams } from 'react-router-dom'
import { Cards } from '../../components/cards'
import SearchBar from '../../components/searchBar'
import { useGetBooksQuery } from '../../redux/slices/bookApiSlice'

export function Home() {
  const { searchTerm, pageNumber } = useParams()

  const { data: books } = useGetBooksQuery({ searchTerm, pageNumber })

  return (
    <>
      <SearchBar />
      <div className='flex justify-center'>
        <Cards books={books?.data ?? []} />
      </div>
    </>
  )
}
