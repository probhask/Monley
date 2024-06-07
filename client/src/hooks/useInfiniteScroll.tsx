import React, { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../store/hooks/hooks";
import { getItems, incPageNumber } from "../store/slice/productSlice";
import useProductSlice from "../store/hooks/useProductSlice";

const useInfiniteScroll = (): React.RefObject<HTMLDivElement> => {
  const { productsLoading: isLoading, productsHasMore: hasMore } =
    useProductSlice();
  const dispatch = useAppDispatch();
  const itemRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>();

  const handleIntersect = useCallback(
    (enteries: IntersectionObserverEntry[]) => {
      if (enteries[0].isIntersecting && hasMore) {
        dispatch(incPageNumber());
        dispatch(getItems());
      }
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    if (itemRef.current) {
      observerRef.current.observe(itemRef.current);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, handleIntersect]);

  return itemRef;
};

export default useInfiniteScroll;
