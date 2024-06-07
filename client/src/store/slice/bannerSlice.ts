import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Banner } from "../../types";


export const getBanner = createAsyncThunk('getBanner', async () => {
    // console.log("env",import.meta.env.VITE_BACKEND_URL);
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/banner`);
    const { data } = response;
    // console.log("banner", data.banner);
    return data.banner
    } catch (error) {
        throw new Error(`getbanner failed ${error}`);
    }
});

type BannerInitailState = {
    data: Banner|null,
    isLoading: boolean,
    isError: string|undefined,
}

const initialState: BannerInitailState = {
    data:null,isLoading: false,isError: '',
}

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBanner.pending, (state) => {
            state.isLoading = true;
            state.isError = '';
        }).addCase(getBanner.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = '';
            state.data = action.payload[0];
        }).addCase(getBanner.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.error.message;
        })
    }
})
export default bannerSlice.reducer;