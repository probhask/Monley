import { Suspense, useEffect } from "react";
import { useAppDispatch } from "../store/hooks/hooks";
import { Items, LoadingSpinner } from "../components";
import { getItems } from "../store/slice/productSlice";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useProductSlice from "../store/hooks/useProductSlice";

const Shop = () => {
  const { products, productsLoading, productsHasMore } = useProductSlice();
  const itemRef = useInfiniteScroll();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <div className="flex flex-col flex-wrap justify-center items-center my-5">
      <div className="relative flex justify-end w-[80%]"></div>
      {products && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-3">
          {products.map((product, index) => {
            if (products.length === index + 1) {
              return (
                <Suspense key={index} fallback={<LoadingSpinner />}>
                  <Items ref={itemRef} item={product} />
                </Suspense>
              );
            }
            return (
              <Suspense key={index} fallback={<LoadingSpinner />}>
                <Items item={product} />
              </Suspense>
            );
          })}
        </div>
      )}
      {productsHasMore && productsLoading && <LoadingSpinner />}
    </div>
  );
};

export default Shop;
