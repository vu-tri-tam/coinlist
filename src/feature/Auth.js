import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: [],
    reducers: {
        loginForm: (state, action) => {

            const userLogin = action.payload
            // console.log(userLogin);
            state.push(userLogin)

        },
        loginOutForm: (state) => {
            state.length = 0

        }


    },
})

// Action creators are generated for each case reducer function
const { reducer, actions } = authSlice
export const { loginForm, loginOutForm } = actions

export default reducer