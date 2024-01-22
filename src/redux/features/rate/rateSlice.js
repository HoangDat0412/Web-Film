import { createSlice } from '@reduxjs/toolkit'
import { rateService } from '../../../services/rateService'



const initialState = {
    totalPoint:0,
    yourPoint:0,

    
}

export const rateSlice = createSlice({
  name: 'rateSlice',
  initialState,
  reducers: {
    setYourPoint : (state,action)=>{
        state.yourPoint = action?.payload
    },
    settotalPoint : (state,action)=>{
        state.totalPoint = action?.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setYourPoint , settotalPoint} = rateSlice.actions

export default rateSlice.reducer

// action api 

export const setRateApi = (data)=>{
    return async (dispatch)=>{

        try {
            const result = await rateService.setRate(data)
            if(result.status === 201){
                dispatch(setYourPoint(result.data?.rate))
                dispatch(getTotalRateApi(data.filmId))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getTotalRateApi = (id)=>{
    return async (dispatch)=>{

        try {
            const result = await rateService.getTotalRate(id)
            if(result.status === 200){
                let rate = 0;
                result.data?.map((item)=>{
                    rate += item.rate
                })
                rate = rate/result.data.length
                dispatch(settotalPoint(rate))

            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getYourRateApi = (id)=>{
    return async (dispatch)=>{
        try {
            const result = await rateService.getYourRate(id)
            if(result.status === 200){
                dispatch(setYourPoint(result.data.rate))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

