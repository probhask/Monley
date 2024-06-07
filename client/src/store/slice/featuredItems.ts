import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {   ProductShort, shortItemsIniialState } from "../../types";

export const getFeaturedItems = createAsyncThunk('getFeaturedItems', async ():Promise<ProductShort[]> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/items/featured`);
    // console.log("featured data", response.data.items);
    
    return response.data.items;
  } catch (error) {
    // console.log("get fetature fail",error);
    
        throw new Error(`getFeaturedItems failed ${error}`);
    
  }
})


const initialState:shortItemsIniialState = {
    data:null,isLoading: false,isError: '',
}

const featuredItemsSlice = createSlice({
  name: "featuredItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeaturedItems.pending, (state) => {
      state.isLoading = true;
      state.isError = '';
    }).addCase(getFeaturedItems.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = '';
    })
      .addCase(getFeaturedItems.rejected, (state, action) => {
        // console.log("action...",action);
      state.isLoading = false;
      state.isError = action.error.message;
    })
  }
});
export default featuredItemsSlice.reducer;
