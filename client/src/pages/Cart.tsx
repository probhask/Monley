import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { getCart } from "../store/actions/cartAction";
import { LoadingSpinner } from "../components";
import { CartItems } from "../features";

const Cart = () => {
  const dispatch = useAppDispatch();
  const custId = useAppSelector((state) => state.user.data?.custId);
  const darkMode = useAppSelector((state) => state.user.darkMode);
  const cartItem = useAppSelector((state) => state.cart.data);
  const cartLoading = useAppSelector((state) => state.cart.isLoading);

  useEffect(() => {
    custId && dispatch(getCart());
  }, []);

  if (cartLoading) {
    return <LoadingSpinner />;
  }
  if (cartItem.length === 0) {
    return (
      <div className={`flex justify-center items-center w-full h-[78vh]`}>
        <div className=" text-5xl font-semibold bg-transparent">
          Cart is Empty
        </div>
        <div
          className={`absolute -z-10 dark:z-0 text-center w-9/12 h-96 opacity-65 ${
            darkMode ? "darkCart" : "lightCart"
          }`}
        ></div>
      </div>
    );
  } else {
    return (
      <div
        className={`w-full h-full flex items-center justify-center px-2 md:px-5`}
      >
        <div className="flex flex-col items-center w-full gap-y-8 my-5">
          {/* <div>
            Total Items: <span>{totalItemsQuantity}</span>
          </div> */}
          {/* items */}
          <div className="flex flex-col w-[100%] md:w-[80%] lg:w-[70%]">
            {/* <div className="flex justify-between items-center bg-black dark:bg-slate-700 text-white dark:text-white px-2 py-1 w-full">
              <div>ITEM</div>
              <div>QUANTITY</div>
              <div>PRICE</div>
            </div> */}
            <div className="flex justify-center items-center bg-black dark:bg-slate-700 text-white dark:text-white px-2 py-1 w-full mb-5">
              CART
            </div>
            {cartItem.map((cart, index) => (
              <CartItems cart={cart} key={index} />
            ))}
          </div>
          {/* total */}
          {/* <div
            className="flex flex-col w-full justify-center items-center"
            onClick={handleBuyAllCart}
          >
            <button className="h-10 w-[80%] md:w-[60%] lg:w-[40%] flex justify-center items-center border border-orange-500 text-orange-500 px-2 py-0.5 rounded-md hover:bg-orange-500 hover:text-white font-semibold text-xl shadow-inner">
              Total Pay:<span>{grandPay}</span>
            </button>
          </div> */}
        </div>
      </div>
    );
  }
};

export default Cart;
