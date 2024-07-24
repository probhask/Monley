import { Order } from "../../types";

const OrderInfo = ({ order }: { order: Order }) => {
  return (
    <div className="flex flex-col bg-[#ff7300] px-5 py-2 rounded-md">
      <div className="flex flex-col gap-x-6  gap-y-3 justify-between">
        <div className=" flex justify-between items-center flex-wrap gap-y-1">
          <div className="flex items-center">
            <div className="flex justify-center items-center w-8 h-8 md:h-10 md:w-10  bg-gray-200 mr-2 rounded-md overflow-hidden">
              <img
                src={order.product_Image[0]}
                alt="product-image"
                className="max-h-full max-w-full object-cover"
              />
            </div>
            <div className="overflow-clip line-clamp-1 text-sm md:text-base font-semibold">
              {order.product_Name}
            </div>
          </div>

          {/* date */}
          <div className="text-sm md:text-base">
            <span className="mr-2  font-semibold">Date: </span>

            {new Date(order.createdTime).toLocaleDateString()}
          </div>
        </div>
        {/* other */}
        <div className="flex gap-x-5 gap-y-2 mt-2 text-sm flex-wrap">
          <div className="">
            <span className="mr-2 font-semibold">Qty: </span>

            {order.quantity}
          </div>
          <div className="">
            <span className="mr-2 font-semibold">Price: </span>₹{" "}
            {order.total_Price}{" "}
          </div>

          <div className="">
            <span className="mr-2 font-semibold">Color: </span>
            {order.color}
          </div>

          <div className="">
            <span className="mr-2 font-semibold">Size: </span>
            {order.size}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
