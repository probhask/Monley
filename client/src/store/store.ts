import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import cartReducer from "./slice/cartSlice";
import userReducer from "./slice/userSlice";
import detailUserReducer from "./slice/detailUser";
import bannerReducer from "./slice/bannerSlice";
import bestSellerReducer from "./slice/bestSellerItems";
import featuredItemsReducer from "./slice/featuredItems";
import newArrivaItemsReducer from "./slice/newArrivalItems";
import productDetailReducer from "./slice/productDetail";
import orderReducer from "./slice/order";
import searchReducer from "./slice/searchSlice";


const store = configureStore({
  reducer: {
    featuredItems: featuredItemsReducer,
    newArrival: newArrivaItemsReducer,
    bestSeller:bestSellerReducer,
    product: productReducer,
    productDetail:productDetailReducer,
    cart: cartReducer,
    user: userReducer,
    detailUser: detailUserReducer,
    banner: bannerReducer,
    order: orderReducer,
    search:searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
