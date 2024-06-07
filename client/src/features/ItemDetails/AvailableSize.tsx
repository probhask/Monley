import { ChooseItem } from "../../components";
import { useMonleyContext } from "../../hooks/useMonleyContext";
import useProductDetailSlice from "../../store/hooks/useProductDetailSlice";

const AvailableSize = () => {
  const { selectedSize, listSize } = useMonleyContext();

  const { itemDetail } = useProductDetailSlice();
  return (
    <div className="flex flex-col gap-x-2 gap-y-2 my-2 flex-wrap">
      <div className="text-sm font-semibold text-gray-600">
        Available Size :{" "}
      </div>
      {itemDetail && itemDetail[0] && (
        <div className=" flex gap-x-2 flex-wrap gap-y-2">
          {itemDetail[0].size?.map((size, index) => (
            <ChooseItem
              key={index}
              item={size}
              selectedItem={selectedSize}
              onClickFunc={() => listSize(size)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableSize;
