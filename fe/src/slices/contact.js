import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
    name: "contact",
    initialState: {
        id: "0",
    },
    reducers: {
        saveContactId: (state, action) => {
            state.id = action.payload
        },
    },
});

export const { saveContactId } = contactSlice.actions
export default contactSlice.reducer;