import { z } from "zod";

export type Banner = {
  bannerId: string;
  productId: string;
  highlight: string;
  image: string;
  largeText: string;
  smallText: string;
};
export type ProductShort = {
  productId: string;
  image: string[];
  item_name: string;
  description: string;
  original_price: number;
  current_price: number;
  discount_percentage: number;
  rating: { stars: number; count: number };
}

export type ProductDeatils = {
  productId: string,
  image: string[],
  collection: string,
  item_name: string,
  description: string,
  category: string,
  gender: string[],
  keyword: string[],
  color: string[],
  size: string[],
  original_price: number,
  current_price: number,
  discount_percentage: number,
  return_period: number,
  delivery_period: number,
  comments: { custId: string, comment: string, rating?: number }[] | undefined,
  rating: { stars: number, count: number },
  soldUnit: number,
}
export type shortItemsIniialState = {
  data: ProductShort[] | null;
  isLoading: boolean;
  isError: string | undefined;
}
export type productInitialState = {
  data: ProductShort[];
  isLoading: boolean;
  isError: string | undefined;
  pageNumber: number;
  hasMore: boolean;
}
export type SearchInitialState = {
  data: ProductShort[];
  isSearching: boolean;
  isError: string | null;
  totalPage: number;
  totalResult: number;
  limit: number;
}
export type UserInitailState = {
  data: User | undefined;
  darkMode: boolean;
  loginStatus: boolean;
  isLoading: boolean;
  isError: string | undefined;
};
export type User = {
  custId: string;
  name: string;
  image: string | undefined;
  email: string;
}
export type UserDetail = {
  custId: string;
  name: string;
  image: string | undefined;
  email: string;
  darkMode: boolean;
  loginStatus: boolean;
}
export type UserAllDetail = {
  custId: string;
  name: string;
  image: string | undefined;
  email: string;
  darkMode: boolean;
  loginStatus: boolean;
  address: string;
}

export type CartItem = {
  cartId: string;
  custId: string;
  product: { productId: string; image: string[]; item_name: string; current_price: number };
  color: string;
  size: string;
  quantity: number;
  totalPrice: number;
}

export type OrderProductFuncParams = {
  productId: string;
  product_Name: string;
  product_Image: string[];
  quantity: number;
  size: string;
  color: string;
  current_price: number;
  total_Price: number;
  pay_Customer: string;
  pay_Card_Number: number;
  pay_Card_Pin: number;
  pay_Ammount: number;
  address: string;
  cartId?: string;
}
export type Order = {
  orderId: string;
  custId:string,
  productId: string;
  product_Name: string;
  product_Image: string[];
  quantity: number;
  size: string;
  color: string;
  current_price: number;
  total_Price: number;
  pay_Customer: string;
  pay_Card_Number: number;
  pay_Card_Pin: number;
  pay_Ammount: number;
  address: string;
  createdTime: Date;
}
export type OrderInitialState = {
  data: Order[],
  isError: string;
  isLoading: boolean;
}

export const orderFormValidationSchema = z.object({
  name: z.string({ required_error: 'name is required' }).trim().min(5, { message: "must minimum contain 5 letters " }),
  address: z.string({ required_error: 'address is required' }).trim().min(6, { message: "must contain minimum 6 letters" }),
  cardNumber: z.number({ required_error: 'car number is required' }).min(8, { message: "must minmum contain 8 numbers" }).positive("must be a postive number"),
  cardPin: z.number({ required_error: 'card pin is required' }).min(4, { message: "must minmum contain 4 numbers" }).positive("must be a postive number"),
});
export type OrderForm = z.infer<typeof orderFormValidationSchema>;
export type OrderFormError = {
  name: { _errors: string[]; } | undefined;
  address: { _errors: string[]; } | undefined;
  cardNumber: { _errors: string[]; } | undefined;
  cardPin: { _errors: string[]; } | undefined;
}

