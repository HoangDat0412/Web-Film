import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import filmSlice from './features/film/filmSlice'
import commentSlice from './features/comment/commentSlice'
import favouritefilmSlice from './features/favouritefilm/favouritefilmSlice'
import rateSlice from './features/rate/rateSlice'
export const store = configureStore({
  reducer: {
    userSlice,
    filmSlice,
    commentSlice,
    favouritefilmSlice,
    rateSlice
  },
})