import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {  ProductShort, shortItemsIniialState } from "../../types";

export const getBestSeller = createAsyncThunk('getBestSeller', async ():Promise<ProductShort[]> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/items/bestSeller`);
    // console.log("get items data", response.data.items);
    return response.data.items;
  } catch (error) {
        throw new Error(`getBestSeller failed ${error}`);
  }
})

const initialState: shortItemsIniialState = {
    data:null,isLoading: false,isError: '',
}


const bestSellerSlice = createSlice({
  name: "bestSeller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBestSeller.pending, (state) => {
      state.isLoading = true;
      state.isError = '';
    }).addCase(getBestSeller.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = '';
    })
      .addCase(getBestSeller.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    })
  }
});
export default bestSellerSlice.reducer;
