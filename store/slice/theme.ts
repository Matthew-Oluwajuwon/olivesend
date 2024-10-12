import { createSlice } from "@reduxjs/toolkit";


const themeSlice = createSlice({
  name: "theme",
  initialState: {value: null},
  reducers: {}
});

export const themeReducer = themeSlice.reducer;
