import { AiFillStar, AiFillTruck } from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io";
import { IoBagHandle } from "react-icons/io5";

const DeliveryInfo = () => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center gap-x-5 items-center w-full font-bold text-black py-4 gap-y-5 mt-6 mb-6">
      <div className="flex h-10 w-48 sm:w-56  items-center justify-evenly bg-gray-300">
        <AiFillTruck className="text-[#ff0000] text-xl sm:text-3xl" />
        <p className="text-sm sm:text-base">FREE SHIPPING</p>
      </div>
      <div className="flex h-10 w-48 sm:w-56  items-center justify-evenly bg-gray-300">
        <IoBagHandle className="text-[#ff0000] text-xl sm:text-3xl" />
        <p className="text-sm sm:text-base">BEST COLLECTIONS</p>
      </div>
      <div className="flex h-10 w-48 sm:w-56  items-center justify-evenly bg-gray-300">
        <IoMdRefresh className="text-[#ff0000] text-xl sm:text-3xl" />
        <p className="text-sm sm:text-base">EASY RETURN</p>
      </div>
      <div className="flex h-10 w-48 sm:w-56 items-center justify-evenly bg-gray-300">
        <AiFillStar className="text-[#ff0000] text-xl sm:text-3xl" />
        <p className="text-sm sm:text-base">GUARENTEED PRODUCT</p>
      </div>
    </div>
  );
};

export default DeliveryInfo;
