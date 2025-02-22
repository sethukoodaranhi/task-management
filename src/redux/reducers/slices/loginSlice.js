import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
       username:'',
       password:''
    },
    reducers: {
        SetloginResponse: (state, action) => {
           
        },
        SetUserType: (state, action) => {
            state.userType = action.payload
        }


    }
})

export const { SetloginStatus,SetUserType } = loginSlice.actions

export default loginSlice.reducer