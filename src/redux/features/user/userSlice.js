import { createSlice } from '@reduxjs/toolkit'
import { TOKEN, USER_LOGIN } from '../../../utils/config';
import { userService } from '../../../services/userService';

// const thongTinNguoiDung = localStorage.getItem("THONG_TIN_NGUOI_DUNG")
// ? JSON.parse(localStorage.getItem("THONG_TIN_NGUOI_DUNG"))
// : {};

const initialState = {
  userLogin: null,
  userInformation: null,

  userList:[],

  responseRegister: null,
  errorRegister: null,

  chechOutResult:null,
  chechOutError:null,

  updateSuccess:null,
  updateFasle:null,

  userCheckoutList:null
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {

    setResponseRegister: (state, action) => {
      state.responseRegister = action.payload;
      state.errorRegister = null;
    },
    setErrorRegister: (state, action) => {
      state.responseRegister = null;
      state.errorRegister = action.payload;
    },
    dangNhapAction: (state, action) => {
      localStorage.setItem(TOKEN, action.payload?.token);
      state.userLogin = action.payload;
    },
    dangXuatAction: (state, action) => {
      localStorage.removeItem(TOKEN);
      state.userInformation = null;
      state.responseRegister = null;
      state.userLogin = null;
    },
    getUserInformation : (state,action)=>{
      state.userInformation = action?.payload
    },
    setCheckoutResult : (state,action)=>{
      state.chechOutResult = action?.payload
    },
    setCheckoutError : (state,action)=>{
      state.chechOutError = action?.payload
    },
    setUpdateSucess : (state,action)=>{
      state.updateSuccess = action?.payload
    },
    setUpdateFalse : (state,action)=>{
      state.updateFasle = action?.payload
    },
    setUserCheckout : (state,action)=>{
      state.userCheckoutList = action?.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setResponseRegister,setErrorRegister,dangNhapAction,getUserInformation,dangXuatAction,setCheckoutResult,setCheckoutError,setUpdateSucess,setUpdateFalse,setUserCheckout } = userSlice.actions

export default userSlice.reducer

// action api 
export const registerActionApi = (thongTinDangKy) => {
  
  return async (dispatch) => {
    try {
      const res = await userService.dangKy(thongTinDangKy);
      if (res.status === 201) {
        dispatch(setResponseRegister(res.data));
      }
    } catch (error) {
      dispatch(setErrorRegister(error));
    }
  };
};

export const loginActionApi = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await userService.dangNhap(thongTinDangNhap);
      dispatch(dangNhapAction(result.data));
    } catch (error) {
      console.log("error login", error);
      dispatch(dangNhapAction(null));
    }
  };
};

export const getUserInformationApi = ()=>{
  return async (dispatch)=>{
    try {
      const result = await userService.getUserInformation()
      dispatch(getUserInformation(result.data))
    } catch (error) {
      console.log(error);
    }
  }
}


export const checkOutApi = (data)=>{
  return async (dispatch) =>{
    try {
      const result = await userService.chechOut(
        {
          moneyPay:200000,
          ...data
      }
      )
      if(result.status = 201){
        dispatch(setCheckoutResult(result.data))
        dispatch(getUserInformationApi())
      }else{
        dispatch(setCheckoutError("Thất bại"))
      }
    } catch (error) {
      console.log(error);
      dispatch(setCheckoutError("Thất bại"))
    }
  }
}

export const updateUserApi = (id,data)=>{
  return async (dispatch)=>{
    try {
      const result = await userService.updateUser(id,data)
      if(result.status === 200){
        dispatch(setUpdateSucess(result.data))
      }else{
        dispatch(setUpdateFalse("Update false"))
      }
    } catch (error) {
      dispatch(setUpdateFalse("Update false"))
    }
  }
}

export const getUserCheckoutApi = ()=>{
  return async (dispatch)=>{
    try {
      const result = await userService.getUserCheckout()
      if(result.status === 200){
        dispatch(setUserCheckout(result.data))
      }
    } catch (error) {
      console.log(error);
    }
  }
}