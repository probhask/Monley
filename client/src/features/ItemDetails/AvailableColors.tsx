import { ChooseItem } from "../../components";
import { useMonleyContext } from "../../hooks/useMonleyContext";
import useProductDetailSlice from "../../store/hooks/useProductDetailSlice";

const AvailableColors = () => {
  const { itemDetail } = useProductDetailSlice();
  const { selectedColor, listColor } = useMonleyContext();

  return (
    <div className="flex flex-col gap-x-2 gap-y-2 flex-wrap mt-4">
      <div className="text-sm font-semibold text-gray-600">
        Available Colors :
      </div>
      {itemDetail && itemDetail[0] && (
        <div className="flex gap-x-2 flex-wrap gap-y-2">
          {itemDetail[0]?.color?.map((color, index) => (
            <ChooseItem
              key={index}
              item={color}
              selectedItem={selectedColor}
              onClickFunc={() => listColor(color)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableColors;
