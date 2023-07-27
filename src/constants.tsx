export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://book-backend-rho.vercel.app/'
    : 'https://book-backend-rho.vercel.app/'
export const BOOKS_URL = '/api/v1/book'
export const AUTH_URL = '/api/v1/auth'
export const USERS_URL = '/api/v1/user'
export const REVIEW_URL = '/api/v1/review'
