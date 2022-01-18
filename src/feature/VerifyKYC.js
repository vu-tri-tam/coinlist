import { createSlice } from '@reduxjs/toolkit'

export const verifySlice = createSlice({
    name: 'KYC',
    initialState: [],
    reducers: {
        VerifyKYC: (state, action) => {

            const dataKYC = action.payload
            // console.log(dataKYC, "data");
            const findIndex = state?.findIndex(res => res.idUser === dataKYC)
            if (dataKYC !== undefined && dataKYC !== null && dataKYC !== {}) {
                if (findIndex === -1) {
                    state.push(dataKYC)
                } else {
                    state[findIndex].idUser = dataKYC
                }

            }


        },
        RemoveVerifyKYC: (state, action) => {

            state.length = 0

        },


    },
})

// Action creators are generated for each case reducer function
const { reducer, actions } = verifySlice
export const { VerifyKYC, RemoveVerifyKYC } = actions

export default reducer