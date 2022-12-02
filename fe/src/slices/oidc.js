import { createSlice } from "@reduxjs/toolkit";
import {reducer as oidc} from 'redux-oidc';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "0",
    },
    reducers: {
        oidc
    },
});

export default userSlice.reducer;