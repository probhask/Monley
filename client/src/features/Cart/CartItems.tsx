import { AiFillDelete, AiOutlineShopping } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { CartItem, ProductDeatils } from "../../types";
import { useMonleyContext } from "../../hooks/useMonleyContext";
import { setSessionStorage } from "../../utils/sessionStorage";
import { removeFromCart } from "../../store/actions/cartAction";

const CartItems = ({ cart }: { cart: CartItem }): JSX.Element => {
  const loginStatus = useAppSelector((state) => state.user.loginStatus);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    setSelectedColor,
    setSelectedQuantity,
    setSelectedSize,
    setTotalPrice,
    setSelectedItem,
    setCartId,
  } = useMonleyContext();

  const handleSingleCacrtBuy = (): void => {
    if (loginStatus) {
      setSelectedColor(cart.color);
      setSessionStorage<string>("selectedColor", cart.color);
      setSelectedSize(cart.size);
      setSessionStorage<string>("selectedSize", cart.size);
      setSelectedQuantity(cart.quantity);
      setSessionStorage<number>("selectedQuantity", cart.quantity);
      setTotalPrice(cart.quantity * cart.product.current_price);
      setSessionStorage<number>(
        "totalPrice",
        cart.quantity * cart.product.current_price
      );
      setSessionStorage("selectedItem", cart.product);
      setSelectedItem(cart.product as ProductDeatils);
      setCartId(cart.cartId);
      setSessionStorage<string>("cartId", cart.cartId);
      navigate("/order");
    }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center px-2 py-2 gap-x-4 gap-y-3 flex-wrap mb-3 bg-gray-100">
      <div className="flex sm:flex-[3] justify-between items-center w-full dark:text-black ">
        <div className="flex items-center w-full overflow-x-clip">
          <div className="flex justify-center items-center w-8 h-8 md:h-10 md:w-10 m bg-gray-200 mr-2">
            <img
              src={cart.product.image[0]}
              alt="product-image"
              className="max-h-full max-w-full object-cover"
            />
          </div>
          <div className="overflow-clip line-clamp-1 text-sm md:text-base">
            {cart.product.item_name}
          </div>
        </div>
        <div className="flex items-center justify-between w-48 gap-x-1.5">
          <div className="text-sm md:text-base">Qty: {cart.quantity}</div>
          <div className="text-sm md:text-base">
            Price: ₹ {cart.totalPrice}{" "}
          </div>
        </div>
      </div>

      {/* button buy and remmove */}
      <div className="cursor-pointer text-red-500 flex justify-self-center items-center gap-y-1.5 gap-x-1.5 sm:flex-1 w-[80%]">
        <button
          className="flex justify-center items-center border border-blue-500 text-blue-500  px-1  sm:px-1 md:px-2 py-0.5 rounded-md hover:bg-blue-600 w-full hover:text-white shadow-inner font-semibold text-sm active:scale-80"
          onClick={handleSingleCacrtBuy}
        >
          <AiOutlineShopping />
          <span>BUY</span>
        </button>
        <button
          className="flex justify-center items-center border border-[#ff0000] text-[#ff0000] px-1  sm:px-1 md:px-2 py-0.5 rounded-md hover:bg-[#ff0000c6] hover:text-white font-semibold text-sm w-full shadow-inner active:scale-80"
          onClick={() => dispatch(removeFromCart(cart.cartId))}
        >
          <AiFillDelete />
          <span>REMOVE</span>
        </button>
      </div>
    </div>
  );
};

export default CartItems;
