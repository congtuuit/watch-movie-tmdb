import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import processReducer from "./slice/processSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    process: processReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
