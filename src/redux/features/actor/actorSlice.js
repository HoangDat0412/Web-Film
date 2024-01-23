import { createSlice } from '@reduxjs/toolkit'
import { actorService } from '../../../services/actorService';
import { getDetailFilmApi } from '../film/filmSlice';

const initialState = {
    actor:null
    
}

export const actorSlice = createSlice({
  name: 'actorSlice',
  initialState,
  reducers: {


  },
})

// Action creators are generated for each case reducer function
export const {  } = actorSlice.actions

export default actorSlice.reducer

// action api 

export const deleteActorApi = (filmId,id)=>{
  return async (dispatch)=>{
    
    try {
      const result = await actorService.deleteActor(id)
      dispatch(getDetailFilmApi(filmId))
    } catch (error) {
      console.log(error);
    }
  }
}

export const createActorApi = (data)=>{
  return async (dispatch) =>{
    try {
      const result = await actorService.createActor(data)
      if(result?.status === 201){
        dispatch(getDetailFilmApi(data.filmId))
      }
    } catch (error) {
      console.log(error);
    }
  }
}
