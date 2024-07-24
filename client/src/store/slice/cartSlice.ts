import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../types";
import { addToCart, getCart, removeFromCart } from "../actions/cartAction";
import toast from "react-hot-toast";

type cartInitialState = {
  data: CartItem[];
  isLoading: boolean;
  isError: string;
};
const initialState: cartInitialState = {
  data: [],
  isLoading: false,
  isError: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.data = action.payload ?? [];
        state.isLoading = false;
        state.isError = "";
      })
      .addCase(getCart.rejected, (state, action) => {
        // console.log("error",action.error);
        state.isLoading = false;
        state.isError =
          (typeof action.error.message === "string" && action.error.message) ||
          "";
        // toast.error(`${action.error.message}`)
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        toast.success("cart Addd");
        state.data = action.payload ?? [];
        state.isLoading = false;
        state.isError = "";
      })
      .addCase(addToCart.rejected, (state, action) => {
        // console.log("error",action.error);
        state.isLoading = false;
        state.isError =
          (typeof action.error.message === "string" && action.error.message) ||
          "";
        toast.error(`${action.error.message}`);
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        toast.success("cart item removed");
        state.data = action.payload ?? [];
        state.isLoading = false;
        state.isError = "";
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        // console.log("error",action.error);
        state.isLoading = false;
        state.isError =
          (typeof action.error.message === "string" && action.error.message) ||
          "";
        toast.error(`${action.error.message}`);
      });
  },
});
export default cartSlice.reducer;
