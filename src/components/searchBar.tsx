import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SearchBar = () => {
  const { searchTerm: urlKeyword } = useParams()
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState(urlKeyword || '')

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (keyword) {
      navigate(`/search/${keyword.trim()}`)
      setKeyword('')
    } else {
      navigate('/')
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
      >
        Search
      </label>
      <div className='relative flex gap-2 justify-center'>
        <input
          type='search'
          id='default-search'
          onChange={(e) => setKeyword(e.target.value)}
          className='block w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search Books'
        />
        <button
          type='submit'
          className='text-white bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
