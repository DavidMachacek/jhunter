import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
    name: "roleFilter",
    initialState: {
        roles: []
    },
    reducers: {
        saveRole: (state, action) => {
            state.roles = action.payload
        },
    },
});

export const { saveRole } = roleSlice.actions
export default roleSlice.reducer;