import { createSlice } from "@reduxjs/toolkit";

export const personSlice = createSlice({
    name: "person",
    initialState: {
        id: "0",
    },
    reducers: {
        savePersonId: (state, action) => {
            state.id = action.payload
        },
    },
});

export const { savePersonId } = personSlice.actions
export default personSlice.reducer;