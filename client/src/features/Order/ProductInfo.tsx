import { useMonleyContext } from "../../hooks/useMonleyContext";

const ProductInfo = () => {
  const {
    selectedColor,
    selectedSize,
    selectedQuantity,
    totalPrice,
    selectedItem,
  } = useMonleyContext();
  return (
    <div className="w-full">
      <div className="flex items-center w-full mb-4 px-2 py-1 bg-orange-500 text-black rounded-md">
        <div className="h-full w-14 mr-2 rounded-md overflow-hidden">
          <img
            src={selectedItem?.image[0]}
            alt="ptoduct-image"
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="flex justify-between w-full">
          <div>
            <div className="font-semibold">
              {selectedItem?.item_name && selectedItem?.item_name.length > 20
                ? `${selectedItem?.item_name.slice(0, 20)}...`
                : selectedItem?.item_name}
            </div>

            <div className="flex gap-x-2">
              <div>
                <span className="text-sm text-gray-900 font-semibold">
                  Color:
                </span>
                <span className=" ml-0.5 text-sm font-semibold text-gray-500">
                  {selectedColor}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-900 font-semibold">
                  Size:
                </span>
                <span className="ml-0.5 text-sm font-semibold text-gray-500">
                  {selectedSize}
                </span>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-900 font-semibold">Qty:</span>
              <span className="ml-0.5 text-sm font-semibold text-gray-500">
                {selectedQuantity}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-end">₹{totalPrice}</div>
            {selectedQuantity > 1 && (
              <div className="text-gray-500 text-sm font-semibold">
                ₹{selectedItem?.current_price} each
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
