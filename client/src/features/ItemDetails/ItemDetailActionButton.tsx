import { AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";

type ItemDetailButtonProps = {
  buyButtonText: string;
  cartButtonText: string;
  buyButtonFunction: () => void;
  cartButtonFunction: () => void;
};

const ItemDetailActionButton = ({
  buyButtonFunction,
  buyButtonText,
  cartButtonFunction,
  cartButtonText,
}: ItemDetailButtonProps) => {
  return (
    <div className="flex flex-col">
      <button
        className="flex justify-center items-center gap-x-4  border-2 border-blue-500 text-blue-500 px-3 py-1.5  rounded-lg hover:bg-blue-600 hover:text-white shadow-inner font-semibold ml-1.5 mb-3 mt-6 text-xl"
        onClick={buyButtonFunction}
      >
        <AiOutlineShopping />
        {buyButtonText}
      </button>

      <button
        className="flex justify-center items-center gap-x-4 w-full border-2 border-[#ff0000] text-[#ff0000] px-3 py-1.5  rounded-lg hover:bg-[#ff0000c6] hover:text-white shadow-inner font-semibold ml-1.5 mb-3 text-xl"
        onClick={cartButtonFunction}
      >
        <AiOutlineShoppingCart />
        {cartButtonText}
      </button>
    </div>
  );
};

export default ItemDetailActionButton;
