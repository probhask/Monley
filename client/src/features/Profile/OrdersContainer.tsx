import useOrderSlice from "../../store/hooks/useOrderSlice";
import OrderInfo from "./OrderInfo";

const OrderContainer = () => {
  const { orders, ordersLoading } = useOrderSlice();
  return (
    <div className="w-full mt-5 dark:text-black">
      <h1 className="font-bold text-2xl mb-5 dark:text-white">Your Orders</h1>
      <div className=" flex flex-col gap-y-8">
        {!ordersLoading &&
          orders &&
          orders.map((order, index) => <OrderInfo order={order} key={index} />)}
      </div>
    </div>
  );
};

export default OrderContainer;
