import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  lastUpdated: 1439478405547,
};

export const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    startProcessing: (state, action) => {
      state.isLoading = true;
      state.lastUpdated = new Date().getTime();
    },
    stopProcessing: (state, action) => {
      state.isLoading = false;
      state.lastUpdated = new Date().getTime();
    },
  },
});

export const processSelector = (state) => state.process.isLoading;
export const { startProcessing, stopProcessing } = processSlice.actions;

export default processSlice.reducer;
