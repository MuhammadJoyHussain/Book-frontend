export type IBook = {
  _id: string
  title: string
  publisher: {
    name: string
    location: string
  }
  genre: string
  publicationYear: string
  reviews: string
  user: string
}

export type IReview = {
  _id: string
  review: string
  book: string
  user: {
    name: string
  }
  createdAt: string
}
