import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getBestSeller } from "../../store/slice/bestSellerItems";
import { Items, ItemShimmer } from "../../components";

const BestSeller = () => {
  const bestSeller = useAppSelector((state) => state.bestSeller.data);
  const bestSellerLoading = useAppSelector(
    (state) => state.bestSeller.isLoading
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const dispatchId = dispatch(getBestSeller());
    return () => dispatchId.abort();
  }, []);

  if (bestSellerLoading) {
    return (
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar my-7">
        {[1, 2, 3, 4].map((index) => (
          <ItemShimmer key={index} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-10 ">
        <h1 className="mb-2 text-2xl font-bold">Best Sellers</h1>
        <div className="w-12 h-0.5 bg-[#ff0000]"></div>
      </div>
      <div className="flex flex-wrap justify-center md:gap-x-10">
        {bestSeller &&
          bestSeller.map((item, index) => <Items item={item} key={index} />)}
      </div>
    </div>
  );
};

export default BestSeller;
