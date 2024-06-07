import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  UserAllDetail, UserInitailState } from "../../types";
import axios from "axios";
import toast from "react-hot-toast";

  export const getDetailUser = createAsyncThunk("", async (_, { getState }) => {
    const { user } = getState() as { user: UserInitailState };
      const custId = user.data?.custId;
      console.log("c",custId);
      
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
         { custId },
        
      );
      if (response.data.user.length === 0) {
        throw new Error("no data Found");
      }
      const user: UserAllDetail = response.data.user[0];
      console.log("user", user);

      return user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`${error.message}`);
      }
      throw new Error(`${error}`);
    }
  });

type DetailUserSliceInitialState = {
    data: UserAllDetail|null;
    isLoading: boolean;
    isError:string|null
  }
const initialState:DetailUserSliceInitialState  = {
  data: null,
  isLoading: false,
  isError: null,
};

const detailUserSlice = createSlice({
  name: "detailUser",
  initialState,
  reducers: {
  },
    extraReducers: (builder) => {
        builder.addCase(getDetailUser.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
        }).addCase(getDetailUser.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false;
            state.isError = null;
        })
            .addCase(getDetailUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error as string;
                toast.error(action.error as string)
        })
    
  },
});
export default detailUserSlice.reducer;
