import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    ticket : {}
}

const ticketSlice = createSlice({
    name : 'ticket',
    initialState,
    reducers : {

    }
})

export default ticketSlice.reducer

export const {

} = ticketSlice.actions