import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { Items, LoadingSpinner } from "../../components";
import { getFeaturedItems } from "../../store/slice/featuredItems";

const Featured = () => {
  const featured = useAppSelector((state) => state.featuredItems.data);
  const featuredLoading = useAppSelector(
    (state) => state.featuredItems.isLoading
  );
  const featuredError = useAppSelector((state) => state.featuredItems.isError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFeaturedItems());
  }, []);

  {
    featuredLoading && (
      <div className="w-full h-[300px]">
        <LoadingSpinner />
      </div>
    );
  }
  {
    featuredError && <div className="text-4xl font-bold">Error</div>;
  }

  return (
    <div className="my-7">
      <h1 className="text-lg h-full font-bold">Featured Products</h1>
      <div className="flex overflow-x-auto hide-scrollbar">
        {featured &&
          featured.map((item, index) => <Items key={index} item={item} />)}
      </div>
    </div>
  );
};

export default Featured;
