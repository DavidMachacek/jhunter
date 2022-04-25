import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
    name: "contactId",
    initialState: "",
    reducers: {
        saveContactId: (state, action) => {
            state.contactId = action.payload
        }
    }
});

export const { saveContactId } = contactSlice.actions
export default contactSlice.reducer;