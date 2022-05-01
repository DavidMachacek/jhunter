import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
    name: "roleFilter",
    initialState: {
        roles: []
    },
    reducers: {
        saveRole: (state, action) => {
            console.log("action.payload")
            console.log(action.payload)
            console.log(state)
            state.roles = action.payload
            console.log("state")
            console.log(state)
        },
    },
});

export const { saveRole } = roleSlice.actions
export default roleSlice.reducer;