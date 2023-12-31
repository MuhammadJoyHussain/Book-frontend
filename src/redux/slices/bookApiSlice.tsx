import { BOOKS_URL } from '../../constants'
import { IBook } from '../../types/globaltypes'
import { apiSlice } from './apiSlices'

export type GetBooksResponse = {
  data: IBook[]
}

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ searchTerm, pageNumber }) => ({
        url: BOOKS_URL,
        params: { searchTerm, pageNumber },
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
    deleteBook: builder.mutation({
      query: ({ booksId, accessToken }) => ({
        url: `${BOOKS_URL}/${booksId}`,
        method: 'DELETE',
        headers: {
          Authorization: accessToken,
        },
      }),
      invalidatesTags: ['books'],
    }),
    updateBook: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `${BOOKS_URL}/${data.booksId}`,
        method: 'PATCH',
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
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApiSlice
