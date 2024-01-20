import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import filmSlice from './features/film/filmSlice'
export const store = configureStore({
  reducer: {
    userSlice,
    filmSlice
  },
})