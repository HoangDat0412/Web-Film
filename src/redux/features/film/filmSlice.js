import { createSlice } from '@reduxjs/toolkit'
import { TOKEN, USER_LOGIN } from '../../../utils/config';
import { userService } from '../../../services/userService';
import { filmService } from '../../../services/filmService';


const initialState = {
    listFilmUser :null,
    filmDetail:null,
    listFilmAdmin:null,
    listFilmSearch:[],
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
    },
    setListFilmSearch: (state,action)=>{
      state.listFilmSearch = action?.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { setListFilm,setDetailFilm,setListFilmSearch } = filmSlice.actions

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

export const getFilmSearchApi = (data)=>{
  return async (dispatch)=>{
    try {
      const result = await filmService.getSearchFilm(data)
      console.log("result",result);
      if(result.status === 200){
        dispatch(setListFilmSearch(result?.data))
      }
    } catch (error) {
      console.log(data);
    }
  }
}