import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {  ProductShort, shortItemsIniialState } from "../../types";

export const getNewArrivalItems = createAsyncThunk('getNewArrivalItems', async (): Promise<ProductShort[]> => {
  
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/items/newArrival`);
    // console.log("get items data", response.data);
    return response.data.items;
  } catch (error) {
        throw new Error(`getNewArrivalItems failed ${error}`);
    
  }
})

const initialState: shortItemsIniialState = {
    data:null,isLoading: false,isError: '',
}

const newArrivalSlice = createSlice({
  name: "featuredItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewArrivalItems.pending, (state) => {
      state.isLoading = true;
      state.isError = '';
    }).addCase(getNewArrivalItems.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = '';
    })
      .addCase(getNewArrivalItems.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    })
  }
});
export default newArrivalSlice.reducer;
