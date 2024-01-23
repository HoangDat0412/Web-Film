import { createSlice } from '@reduxjs/toolkit'

import { filmtypeService } from '../../../services/filmtypeService';
import { getDetailFilmApi } from '../film/filmSlice';

const initialState = {
    filmtype:null
    
}

export const filmtypeSlice = createSlice({
  name: 'actorSlice',
  initialState,
  reducers: {


  },
})

// Action creators are generated for each case reducer function
export const {  } = filmtypeSlice.actions

export default filmtypeSlice.reducer

// action api 
export const deleteFilmTypeApi = (filmId,id)=>{
    return async (dispatch)=>{
      
      try {
        const result = await filmtypeService.deleteFilmtype(id)
        dispatch(getDetailFilmApi(filmId))
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  export const createFilmTypeApi = (data)=>{
    return async (dispatch) =>{
      try {
        const result = await filmtypeService.createFilmtype(data)
        if(result?.status === 201){
          dispatch(getDetailFilmApi(data.filmId))
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
