import { createSlice } from '@reduxjs/toolkit'

const storedUserInfo = localStorage.getItem('userInfo')
const initialState = {
  userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // 30 days
      localStorage.setItem('expirationTime', expirationTime.toString())
    },
    logout: (state) => {
      state.userInfo = null
      localStorage.clear()
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
