import { useAppSelector } from "./hooks";

const useProductSlice = () => {
  const products = useAppSelector((state) => state.product.data);
  const productsLoading = useAppSelector((state) => state.product.isLoading);
  const productsError = useAppSelector((state) => state.product.isError);
  const productsPageNumber = useAppSelector(
    (state) => state.product.pageNumber
  );
  const productsHasMore = useAppSelector((state) => state.product.hasMore);
  return {
    products,
    productsLoading,
    productsError,
    productsPageNumber,
    productsHasMore,
  };
};
export default useProductSlice;
