import { Link } from "react-router-dom";
import { ProductShort } from "../types";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { forwardRef } from "react";

type itemsProps = {
  item: ProductShort;
};

const Items = forwardRef<HTMLDivElement, itemsProps>(
  ({ item }: itemsProps, ref) => {
    return (
      <div
        className="w-56 h-full flex-shrink-0 mx-2 my-2  bg-gray-50 dark:bg-slate-900"
        ref={ref}
      >
        <div className="relative sm:min-w-[224px] sm:min-h-[300px] /*max-h-full min-w-full*/ bg-gray-100 flex justify-center items-center">
          <img
            src={`/${item.image[0]}`}
            alt="item-image"
            className="max-w-full max-h-full object-contain"
          />

          <div
            className={`absolute top-0 flex w-full  ${
              item.discount_percentage ? "justify-between" : "justify-end"
            }`}
          >
            {item.discount_percentage && (
              <div className="bg-red-500 px-1 text-sm font-semibold text-white">
                {item.discount_percentage}% OFF
              </div>
            )}
            <div className="flex text-xl justify-end items-center">
              {[...Array(item.rating.stars)].map((e, i) => {
                return <AiFillStar key={i} className="text-yellow-400" />;
              })}
              {[...Array(5 - item.rating.stars)].map((e, i) => {
                return <AiOutlineStar key={i} className="text-yellow-400" />;
              })}
            </div>
          </div>
        </div>
        <Link
          to={`/shop/product/${item.productId}`}
          className=" flex flex-col cursor-pointer min-h-16 my-2 px-1.5 text-sm"
        >
          <div className="flex justify-between gap-x-4">
            <div className="font-semibold mb-0.5">{item.item_name}</div>
            <div className="text-orange-600 font-semibold">
              ₹{item.current_price}
            </div>
          </div>
          <div className="text-[0.7rem] font-semibold text-gray-600 dark:text-gray-400">
            {item.description}
          </div>
        </Link>
        {/* <div className="flex justify-between px-1.5">
        {item.discount_percentage && (
          <div className="text-red-600 font-semibold">
            {item.discount_percentage}% OFF
          </div>
        )}
        <button className="border-2 border-[#ff0000] text-[#ff0000] px-3 py-1 text-sm rounded-lg hover:bg-[#ff0000] hover:text-white shadow-inner font-semibold ml-1.5 mb-3">
          Add to Cart
        </button>
      </div> */}
      </div>
    );
  }
);

export default Items;
