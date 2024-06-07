import useProductDetailSlice from "../../store/hooks/useProductDetailSlice";

/*
 **Item name
 **description
 **collection
 */
const ItemBasicDetail = () => {
  const { itemDetail } = useProductDetailSlice();

  return (
    <>
      <div>
        <div className="text-lg sm:text-2xl font-bold">
          {itemDetail && itemDetail[0].item_name}
        </div>
        <div className="text-base sm:text-lg font-semibold text-gray-500 w-full">
          {itemDetail && itemDetail[0].description}
        </div>
      </div>
      <div className="text-lg text-gray-600 dark:text-gray-200 font-semibold">
        <span className="text-sm font-semibold text-gray-600 mr-2">
          Collection :
        </span>
        {itemDetail && itemDetail[0].collection}
      </div>
    </>
  );
};

export default ItemBasicDetail;
