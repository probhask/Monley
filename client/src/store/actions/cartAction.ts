import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem } from "../../types";
import axios from "axios";

export const getCart = createAsyncThunk('cart/getCart', async (_,{getState}): Promise<CartItem[]> => {
    const { user } = getState();
    const custId = user.data.custId;
    // console.log(custId);
    
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart`, {
            params:{custId:custId}
        })
        if (response.data.cart) {
            return response.data.cart;
        }
        return []
    } catch (error) {
       throw new Error(`${error.message}`);
    }
})

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, color, size, quantity, totalPrice }: { productId: string; color: string; size: string; quantity: number;totalPrice:number },{getState}): Promise<CartItem[]> => {
    const { user } = getState();
    const custId = user.data.custId;
    // console.log(productId, color, quantity, totalPrice, size);
    try {
        
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/cart/add`, {
             params:{productId,color,size,quantity,totalPrice,custId}
         })
        // console.log("add to cart response",response);
        return response.data.cart;
        
    } catch (error) {
        throw new Error(`${error.message}`)
    }
    
})
export const removeFromCart = createAsyncThunk("cart/remove", async (cartId:string,{getState}) => {
    // console.log(cartId);
    const { user } = getState();
    const custId = user.data.custId;
     try {
        
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cart/remove`, {
             params:{cartId,custId}
         })
        // console.log("add to cart response",response);
        return response.data.cart;
        
    } catch (error) {
        throw new Error(`${error.message}`)
    }
    
})