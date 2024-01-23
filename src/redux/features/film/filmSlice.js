import { createSlice } from '@reduxjs/toolkit'
import { TOKEN, USER_LOGIN } from '../../../utils/config';
import { userService } from '../../../services/userService';
import { filmService } from '../../../services/filmService';


const initialState = {
    listFilmUser :null,
    filmDetail:null,
    listFilmAdmin:null,
    listFilmSearch:[],

    deleteResult:true,
    updateResult:true,
    createResult:true
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
    setDeleteResult:(state,action)=>{
      state.deleteResult = action?.payload
    },
    setUpdateResult : (state,action)=>{
      state.updateResult = action?.payload
    },
    setCreateResult : (state,action)=>{
      state.createResult = action?.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setListFilm,setDetailFilm,setListFilmSearch ,setDeleteResult,setUpdateResult,setCreateResult} = filmSlice.actions

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


export const deleteFilmApi = (id)=>{
  return async (dispatch)=>{
    try {
      const result = await filmService.deleteFilm(id)
      if(result?.status === 200){
        dispatch(setDeleteResult(true))
        dispatch(getListFilmUserApi())
      }else{
        dispatch(setDeleteResult(false))
      }
    } catch (error) {
      console.log(error);
      dispatch(setDeleteResult(false))
    }
  }
}


export const updateFilmApi = (id,data)=>{
  return async (dispatch)=>{
    try {
      const result = await filmService.updateFilm(id,data)
      if(result?.status === 200){
        dispatch(setUpdateResult(true))
        dispatch(getDetailFilmApi(id))
      }
    } catch (error) {
      console.log(error);
      dispatch(setUpdateResult(false))
    }
  }
}


export const createFilmApi = (data)=>{
  return async (dispatch)=>{

    try {
      const result = await filmService.createFilm(data)
      if(result?.status === 201){
        dispatch(setCreateResult(true))
      }else{
        dispatch(setCreateResult(false))
      }
    } catch (error) {
      dispatch(setCreateResult(false))
    }
  }
}

