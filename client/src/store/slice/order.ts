import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  Order,
  OrderInitialState,
  OrderProductFuncParams,
  UserInitailState,
} from "../../types";
import toast from "react-hot-toast";

export const orderProduct = createAsyncThunk(
  "orderProduct",
  async (param: OrderProductFuncParams, { getState }): Promise<Order> => {
    const { user } = getState() as { user: UserInitailState };
    const custId = user.data?.custId;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order`,
        { ...param, custId }
      );
      // console.log("order donew",response.data.order);
      return response.data.order[0] as Order;
    } catch (e) {
      const error = e as AxiosError;
      throw new Error(error.message);
    }
  }
);
export const getUserOrderList = createAsyncThunk(
  "getUserOrderList",
  async (_, { getState }) => {
    const { user } = getState() as { user: UserInitailState };
    const custId = user.data?.custId;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/order/userOrder`,
        { params: { custId } }
      );
      // console.log("order donew",response.data);
      return response.data.order as Order[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }
      throw new Error(e as string);
    }
  }
);

const initialState: OrderInitialState = {
  data: [],
  isLoading: false,
  isError: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrderList.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(getUserOrderList.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.isError = "";
      })
      .addCase(getUserOrderList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error as string;
        toast.error(action.error as string);
      });
    builder
      .addCase(orderProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(orderProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.isLoading = false;
        state.isError = "";
        toast.success(`Order Success Your orderId:${action.payload.orderId}`);
        setTimeout(() => {
          window.location.replace("/user-profile");
        }, 1000);
      })
      .addCase(orderProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "no";
      });
  },
});
export default orderSlice.reducer;
