import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
    error: null
};

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearUser: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;