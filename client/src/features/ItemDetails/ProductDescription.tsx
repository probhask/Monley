import AvailableColors from "./AvailableColors";
import AvailableSize from "./AvailableSize";
import ItemDetailPrice from "./ItemDetailPrice";
import ItemBasicDetail from "./ItemBasicDetail";
import ItemDetailActionButton from "./ItemDetailActionButton";
import QuantityMeter from "../../components/QuantityMeter";
import { useMonleyContext } from "../../hooks/useMonleyContext";
import useProductDetailSlice from "../../store/hooks/useProductDetailSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ProductDescription = () => {
  const {
    selectedQuantity,
    incQty,
    decQty,
    totalPrice,
    calcTotalPrice,
    handleAddCart,
    handleBuyBtn,
  } = useMonleyContext();

  const { itemDetail } = useProductDetailSlice();
  const addCart = () => {
    if (itemDetail) {
      handleAddCart(itemDetail[0]);
    } else {
      toast.error("Tech Error : not able to get product data ");
    }
  };
  const buy = () => {
    if (itemDetail) {
      handleBuyBtn(itemDetail[0]);
    } else {
      toast.error("Tech Error : not able to get product data ");
    }
  };

  useEffect(() => {
    if (itemDetail !== null && selectedQuantity && itemDetail) {
      calcTotalPrice(selectedQuantity, itemDetail[0]);
    }
  }, [selectedQuantity, itemDetail]);

  return (
    <div className="w-full h-full px-4 md:px-8 mt-5 md:mt-auto mb-5 md:my-auto flex flex-col gap-y-2">
      {/* name dexcriptio and collection detail */}
      <ItemBasicDetail />

      {/* price info */}
      <ItemDetailPrice />

      {/* available color */}
      <AvailableColors />

      {/* available size */}
      <AvailableSize />

      {/* quatity */}
      <QuantityMeter
        qunatity={selectedQuantity}
        incQtyFunction={incQty}
        decQtyFunction={decQty}
      />

      <ItemDetailActionButton
        buyButtonText={`BUY ₹${totalPrice}`}
        buyButtonFunction={buy}
        cartButtonText="ADD TO CART"
        cartButtonFunction={addCart}
      />
    </div>
  );
};

export default ProductDescription;
