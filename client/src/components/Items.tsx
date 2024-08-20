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
            className=" max-h-[300px] max-w-[225px] object-contain"
          />

          <div
            className={`absolute top-0 flex w-full  ${
              item.discount_percentage ? "justify-between" : "justify-end"
            }`}
          >
            {item.discount_percentage && (
              <div className="bg-red-500/80 px-1 text-sm font-semibold text-white">
                {item.discount_percentage}% OFF
              </div>
            )}
            <div className="flex text-xl justify-end items-center">
              {[...Array(item.rating.stars)].map((_, i) => {
                return <AiFillStar key={i} className="text-yellow-400" />;
              })}
              {[...Array(5 - item.rating.stars)].map((_, i) => {
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
            <div className="text-orange-800 font-semibold">
              ₹{item.current_price}
            </div>
          </div>
          <div className="text-[0.7rem] font-semibold text-gray-600 dark:text-gray-400">
            {item.description}
          </div>
        </Link>
      </div>
    );
  }
);

export default Items;
