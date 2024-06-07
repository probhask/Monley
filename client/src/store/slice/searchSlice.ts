import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductShort, SearchInitialState } from "../../types";
import toast from "react-hot-toast";
import { getFilterSession } from "../../utils/sessionStorage";

export const getSearchItem = createAsyncThunk('getSearchItem', async ({ searchTerm, page }: { searchTerm: string; page?:number} ,{ getState }): Promise<{ item: ProductShort[]; totalResult:number}> => {
    const { search } = getState() as{search:SearchInitialState};
  const limit = search.limit;
  const filter = getFilterSession()||null;
  try {
       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/search`, {
      params: { searchTerm, filter,page:page||1  ,limit:limit},
    })
    return response.data.search;
  } catch (error) {
    if (axios.isAxiosError(error)) {
          throw new Error(` ${error.message}`);
    }
    throw new Error(` ${error}`);
  }
})

const initialState:SearchInitialState = {
  data: [], isSearching: false, isError: '',totalPage: 0,totalResult:0,limit:5
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    

  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchItem.pending, (state) => {
      state.isSearching = true;
      state.isError = '';
    }).addCase(getSearchItem.fulfilled, (state, action) => {
        state.data = action.payload.item;
        state.totalResult = action.payload.totalResult;
        state.totalPage=Math.ceil(action.payload.totalResult/state.limit)
      state.isSearching = false;
      state.isError = '';
    }).addCase(getSearchItem.rejected, (state, action) => {        
        state.isSearching = false;
        state.isError = action.error.message||null;
        toast.error(action.error as string)
    })
  }
});

export default searchSlice.reducer;
