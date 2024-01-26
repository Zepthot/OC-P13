import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk (
    'user/loginUser',
    async (userData) => {
        const request = await axios.post (
            'http://localhost:3001/api/v1/user/login',
            userData
        )
        localStorage.setItem('token', request.data.body.token);
        return request.data;
    }
)

export const profileUser = createAsyncThunk (
    'user/profileUser',
    async () => {
        const request = await axios.post (
            'http://localhost:3001/api/v1/user/profile',
            {},
            {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        )
        localStorage.setItem('user', JSON.stringify(request.data.body));
        return request.data;
    }
)

export const logoutUser = createAsyncThunk (
    'user/logoutUser',
    async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
)

export const changeProfileUser = createAsyncThunk (
    'user/changeProfileUser',
    async (userData) => {
        const request = await axios.put (
            'http://localhost:3001/api/v1/user/profile',
            userData,
            {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        )
        localStorage.setItem('user', JSON.stringify(request.data.body));
        return request.data;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        token: null,
        profile: null,
        error: null
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.token = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.token = null;
            state.profile = null;
            // console.error('userSlice rejected error: ', action.error.message);
            if (action.error.code === 'ERR_BAD_REQUEST') {
                state.error = 'User unauthorized';
            } else {
                state.error = action.error.message;
            }
        })
        .addCase(profileUser.pending, (state) => {
            state.loading = true;
            state.profile = null;
            state.error = null;
        })
        .addCase(profileUser.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
            state.error = null;
        })
        .addCase(profileUser.rejected, (state, action) => {
            state.loading = false;
            state.profile = null;
            // console.error('userSlice rejected error: ', action.error.message);
            if (action.error.message === 'Request failed with status code 401') {
                state.error = 'User unauthorized';
            } else {
                state.error = action.error.message;
            }
        })
        .addCase(logoutUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.token = null;
            state.profile = null;
            state.error = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.token = null;
            state.profile = null;
            state.error = action.error.message;
        })
        .addCase(changeProfileUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(changeProfileUser.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
            state.error = null;
        })
        .addCase(changeProfileUser.rejected, (state, action) => {
            state.loading = false;
            state.profile = null;
            state.error = action.error.message;
        })
    }
})

export default userSlice.reducer;