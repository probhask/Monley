import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductDeatils, UserInitailState } from "../../types";
import toast from "react-hot-toast";

export const getItemsDetail = createAsyncThunk(
  "getItems",
  async (itemId: string): Promise<ProductDeatils[]> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/items/detail`,
        {
          params: {
            itemId: itemId,
          },
        }
      );
      return response.data.items;
    } catch (error) {
     if(axios.isAxiosError(error))
        throw new Error(`${error.message}`);
      else
        throw new Error(error as string);
    }
  }
);

export const giveRating = createAsyncThunk(
  "giveRatings",
  async (rating: number, { getState }) => {
    const { user, productDetail } = (await getState()) as {
      user: UserInitailState;
      productDetail: productDeatailInitialState;
    };
    console.log(rating, user, productDetail);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/items/rating`,
        {
          params: {
            productId: productDetail.data && productDetail.data[0].productId,
            custId: user.data?.custId,
            rating: rating,
          },
        }
      );
      return response.data.items;
    } catch (error) {
      if(axios.isAxiosError(error))
        throw new Error(`${error.message}`);
      else
        throw new Error(error as string);
    }
  }
);

export const getSimilarItems = createAsyncThunk(
  "getSimilarItems",
  async (_, { getState }) => {

    const { productDetail } = (await getState()) as {
      productDetail: productDeatailInitialState;
    };
    const category = productDetail.data && productDetail.data[0].category;
    const collection = productDetail.data && productDetail.data[0].collection;
    const productId= productDetail.data && productDetail.data[0].productId
    const gender= productDetail.data && productDetail.data[0].gender[0]
    // console.log("get similar", category, collection);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/items/similar`,
        {
          params: { collection, category,productId,gender },
        }
      );
      // console.log(response.data.items);

      return response.data.items;
    } catch (error) {
     if(axios.isAxiosError(error))
        throw new Error(`${error.message}`);
      else
        throw new Error(error as string);
    }
  }
);

type productDeatailInitialState = {
  data: null | ProductDeatils[];
  isLoading: boolean;
  similarItems: null | ProductDeatils[];
  similarLoading: boolean;
  isError: string | undefined;
  notFound: boolean;
  similarNotFound: boolean;
};

const initialState: productDeatailInitialState = {
  data: null,
  isLoading: false,
  isError: "",
  notFound: false,
  similarItems: null,
  similarLoading: false,
  similarNotFound:false

};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItemsDetail.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
        state.notFound = false;
      })
      .addCase(getItemsDetail.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.notFound = true;
          toast.error(`item detail not found`);
        }
        state.data = action.payload;
        state.isLoading = false;
        state.isError = "";
      })
      .addCase(getItemsDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.notFound = false;
        toast.error(action.error.message as string);
      })
      .addCase(getSimilarItems.pending, (state) => {
        state.similarLoading = true;
        state.similarNotFound = false;
        state.isError = "";
      })
      .addCase(getSimilarItems.fulfilled, (state, action) => {
        // console.log(action.payload);
        
        if (action.payload.length === 0) {
          state.similarNotFound = true;
        }
        state.similarItems = action.payload;
        state.similarLoading = false;
        state.isError = "";
      })
      .addCase(getSimilarItems.rejected, (state, action) => {
        state.similarLoading = false;
        state.similarNotFound = false;
        state.isError = action.error.message;
        toast.error(action.error.message as string);
      })
  },
});
export default productDetailSlice.reducer;
