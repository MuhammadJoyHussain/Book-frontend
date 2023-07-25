import { BOOKS_URL } from '../../constants'
import { IBook } from '../../types/globaltypes'
import { apiSlice } from './apiSlices'

export type GetBooksResponse = {
  data: IBook[]
}

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<GetBooksResponse, void>({
      query: () => ({
        url: BOOKS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getBooksDetails: builder.query({
      query: (bookId) => ({
        url: `${BOOKS_URL}/${bookId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createBook: builder.mutation<
      IBook,
      { data: Partial<IBook>; accessToken: string }
    >({
      query: ({ data, accessToken }) => ({
        url: `${BOOKS_URL}/create-book`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: accessToken,
        },
      }),
      invalidatesTags: ['books'],
    }),
  }),
})

export const {
  useGetBooksQuery,
  useGetBooksDetailsQuery,
  useCreateBookMutation,
} = booksApiSlice
