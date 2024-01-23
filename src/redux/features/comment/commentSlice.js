import { createSlice } from '@reduxjs/toolkit'
import { commentService } from '../../../services/commentService';


const initialState = {
    listComment : null,
    
}

export const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    setListComment: (state, action) => {
      state.listComment = action?.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { setListComment } = commentSlice.actions

export default commentSlice.reducer

// action api 

export const postCommentApi = (data)=>{
    return async (dispatch)=>{


        try {
            const result = await commentService.postComment(data)
            console.log("result",result);
            
            if (result.status === 201) {
                dispatch(getListCommentApi(data?.filmId))
            } else {
                alert("Lỗi comment")
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getListCommentApi = (id)=>{
    return async (dispatch)=>{


        try {
            const result = await commentService.getListComment(id)
            console.log("result",result);
            if (result.status === 200) {
                dispatch(setListComment(result.data))
            } else {
                console.log(result.status);
            }
        } catch (error) {
            console.log(error);
        }
    }
}