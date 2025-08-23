import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:"filter",
    initialState:{},
    reducers:{
        updateFilter: (state, action) => {
            state = { ...state, ...action.payload };
            console.log("Filter data in filter Slice : " , state);
            return state;
        },
        resetFilter: (state) => {
            state = {};
            return state;
        }
    }
})
export const { updateFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;