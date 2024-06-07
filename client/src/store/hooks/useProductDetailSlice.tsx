import { useAppSelector } from "./hooks";

const useProductDetailSlice = () => {
  const itemDetail = useAppSelector((store) => store.productDetail.data);
  const itemDetailLoading = useAppSelector(
    (store) => store.productDetail.isLoading
  );

  const itemDetailNotFound = useAppSelector(
    (store) => store.productDetail.notFound
  );
  const similarItems = useAppSelector(
    (store) => store.productDetail.similarItems
  );
  const similarItemsLoading = useAppSelector(
    (store) => store.productDetail.similarLoading
  );
  const similarItemsNotFound = useAppSelector(
    (store) => store.productDetail.similarNotFound
  );
  const itemDetailError = useAppSelector(
    (store) => store.productDetail.isError
  );
  return {
    itemDetail,
    itemDetailLoading,
    itemDetailError,
    itemDetailNotFound,
    similarItems,
    similarItemsLoading,
    similarItemsNotFound,
  };
};

export default useProductDetailSlice;
