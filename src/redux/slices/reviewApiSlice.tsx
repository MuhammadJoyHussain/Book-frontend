import { REVIEW_URL } from '../../constants'
import { IReview } from '../../types/globaltypes'
import { apiSlice } from './apiSlices'

export type GetReviewResponse = {
  data: IReview[]
}

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReview: builder.query<GetReviewResponse, void>({
      query: () => ({
        url: REVIEW_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    createReview: builder.mutation<
      IReview,
      { data: Partial<IReview>; accessToken: string }
    >({
      query: ({ data, accessToken }) => ({
        url: `${REVIEW_URL}/create-review`,
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

export const { useGetReviewQuery, useCreateReviewMutation } = reviewApiSlice
