import { createSlice } from '@reduxjs/toolkit'
import { baseService } from '../../../services/baseServices'
import { userService } from '../../../services/userService'

const initialState = {
    checkoutList:[]
    
}

export const checkoutSlice = createSlice({
  name: 'checkoutSlice',
  initialState,
  reducers: {
    setCheckoutList : (state,action)=>{
       state.checkoutList = action?.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setCheckoutList } = checkoutSlice.actions

export default checkoutSlice.reducer

// action api 

export const getAllCheckout = ()=>{
    return async (dispatch)=>{
        try {
            const result = await userService.get('/checkout/getall')
            if(result?.status === 200){
                dispatch(setCheckoutList(result?.data))
            }
        } catch (error) {
            console.log(error);
        }
    }
}
