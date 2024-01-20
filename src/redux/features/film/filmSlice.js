import { createSlice } from '@reduxjs/toolkit'
import { TOKEN, USER_LOGIN } from '../../../utils/config';
import { userService } from '../../../services/userService';
import { filmService } from '../../../services/filmService';


const initialState = {
    listFilmUser :null,
    filmDetail:null,
    listFilmAdmin:null
}

export const filmSlice = createSlice({
  name: 'filmSlice',
  initialState,
  reducers: {
    setListFilm: (state, action) => {
      state.listFilmUser = action?.payload;
    },
    setDetailFilm: (state,action)=>{
      state.filmDetail = action?.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { setListFilm,setDetailFilm } = filmSlice.actions

export default filmSlice.reducer

// action api 

export const getListFilmUserApi = ()=>{
    return async (dispatch)=>{
        try {
            const result = await filmService.getListFilmUser();
            dispatch(setListFilm(result?.data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const getDetailFilmApi = (id)=>{
  return async (dispatch) =>{
    try {
      const result = await filmService.getFilmDetail(id);
      dispatch(setDetailFilm(result?.data))
  } catch (error) {
      console.log(error);
  }
  }
}