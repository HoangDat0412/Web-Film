import { createSlice } from '@reduxjs/toolkit'
import { favouriteFilmService } from '../../../services/favouritefilmService';



const initialState = {
    listFavouriteFilm : null,
    checkFilmIsFavourite:false,
    
}

export const favouritefilmSlice = createSlice({
  name: 'favouritefilmSlice',
  initialState,
  reducers: {
    setFavouriteFilm: (state, action) => {
      state.listFavouriteFilm = action?.payload;
    },
    setcheckFilmIsFavourite : (state,action)=>{
        state.checkFilmIsFavourite = action?.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setFavouriteFilm,setcheckFilmIsFavourite } = favouritefilmSlice.actions

export default favouritefilmSlice.reducer

// action api 
export const getFavouriteFilmApi = ()=>{
    return async (dispatch)=>{
        try {
            const result = await favouriteFilmService.getListFilm()
            if(result.status === 200){
                dispatch(setFavouriteFilm(result.data))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const createAndDeleteFavouriteFilmApi = (data)=>{
    return async (dispatch)=>{

        try {
            console.log("data",data);
            const result = await favouriteFilmService.setFavouriteFilm(data)
            if(result.status === 201){
                console.log("set check films is favourite true");
                dispatch(setcheckFilmIsFavourite(true))
            }
            if(result.status === 200){
                console.log("set check films is favourite false");
                dispatch(setcheckFilmIsFavourite(false))
                dispatch(getFavouriteFilmApi())
            }
        } catch (error) {
            console.log(error);
        }
    }
}

