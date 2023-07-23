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