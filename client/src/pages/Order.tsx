import { useEffect } from "react";
import { useMonleyContext } from "../hooks/useMonleyContext";
import toast from "react-hot-toast";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { OrderFormFill, ProductInfo } from "../features";

const Order = () => {
  const { selectedColor, selectedSize, selectedQuantity, selectedItem } =
    useMonleyContext();

  useEffect(() => {
    if (!selectedColor || !selectedSize || !selectedQuantity || !selectedItem) {
      toast.error("Please select color and size", {
        icon: <IoMdInformationCircleOutline className="text-red-500" />,
        className: "bg-blue-500 text-white",
      });
      window.history.back();
    }
  }, []);

  return (
    <div className="my-5 flex flex-col justify-center items-center w-full">
      <h1 className="font-bold text-lg mb-5">Payment InterFace</h1>
      <div className="flex flex-col md:flex-row md:gap-x-3 gap-y-3 w-full px-2  sm:px-5 lg:px-10">
        {/* product */}
        <ProductInfo />
        {/* payment */}
        <OrderFormFill />
      </div>
    </div>
  );
};

export default Order;
