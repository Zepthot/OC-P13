import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userData) => {
        console.log(userData)
        const request = await axios.post('http://localhost:3001/api/v1/user/login', userData)
        console.log(request)
        console.log('token: ', request.data.body.token)
        localStorage.setItem('token', request.data.body.token);
        return request;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    }
})

export default userSlice.reducer;