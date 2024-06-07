import { useAppSelector } from "./hooks";

export const useOrderSlice = () => {
  const orders = useAppSelector((state) => state.order.data);
  const orderError = useAppSelector((state) => state.order.isError);
  const ordersLoading = useAppSelector((state) => state.order.isLoading);

  return { orders, orderError, ordersLoading };
};
export default useOrderSlice;
