import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {  productInitialState, ProductShort } from "../../types";
import toast from "react-hot-toast";

export const getItems = createAsyncThunk('getItems', async (_, { getState }): Promise<ProductShort[]> => {
  const { product } = getState();
  const pageNumber = product.pageNumber;
  // console.log("page", pageNumber);
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/items`, {
      params:{page:pageNumber,limit:5}
    })
    return response.data.items
  } catch (error) {
        throw new Error(`getItems failed ${error}`);
    
  }
})

const initialState: productInitialState = {
  data: [], isLoading: false, isError: '', pageNumber: 1, hasMore: true
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    incPageNumber: (state) => {
      state.pageNumber += 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.isLoading = true;
      state.isError = '';
    }).addCase(getItems.fulfilled, (state, action) => {
      state.data.push(...action.payload)
      state.hasMore = action.payload.length > 0
      state.isLoading = false;
      state.isError = '';
    }) 
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        toast.error(action.error as string)
      })
      
  }
});
export const {incPageNumber}=productSlice.actions
export default productSlice.reducer;
