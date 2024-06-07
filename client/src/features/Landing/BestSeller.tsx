import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getBestSeller } from "../../store/slice/bestSellerItems";
import { Items } from "../../components";

const BestSeller = () => {
  const newArrival = useAppSelector((state) => state.bestSeller.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBestSeller());
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-10 ">
        <h1 className="mb-2 text-2xl font-bold">Best Sellers</h1>
        <div className="w-12 h-0.5 bg-[#ff0000]"></div>
      </div>
      <div className="flex flex-wrap justify-center md:gap-x-10">
        {newArrival &&
          newArrival.map((item, index) => <Items item={item} key={index} />)}
      </div>
    </div>
  );
};

export default BestSeller;
