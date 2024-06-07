import useProductDetailSlice from "../../store/hooks/useProductDetailSlice";

const ItemDetailPrice = () => {
  const { itemDetail } = useProductDetailSlice();
  return (
    <div className="flex flex-col sm:flex-row gap-x-4 sm:items-center">
      <div className="text-sm font-semibold text-gray-600">Price :</div>
      <div className="flex gap-x-2 items-baseline">
        <div className="text-lg sm:text-2xl text-gray-600 dark:text-gray-200 font-semibold">
          ₹{itemDetail && itemDetail[0].current_price}
        </div>
        <div className="text-sm sm:text-base text-gray-400 line-through">
          ₹{itemDetail && itemDetail[0].original_price}
        </div>
        <div className=" text-red-500 text-sm md:text-base font-semibold">
          {itemDetail && itemDetail[0].discount_percentage}% OFF
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPrice;
