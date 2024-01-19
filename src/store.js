import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./common/userSlice";

export const store = configureStore ({
    reducer: {
        user: userReducer
    }
})