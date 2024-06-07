import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import useProductDetailSlice from "../../store/hooks/useProductDetailSlice";
import { useState } from "react";

const ImageView = (): JSX.Element => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const { itemDetail } = useProductDetailSlice();
  return (
    <div className=" flex justify-center items-center w-full h-full ">
      {itemDetail && (
        <div className="relative flex justify-center items-center  ">
          <div className="w-full h-full flex flex-col md:flex-row-reverse justify-between items-center  ">
            <div className="relative w-full h-full ">
              {itemDetail[0].image && (
                <img
                  src={`/${itemDetail[0].image[imageIndex]}`}
                  alt="Product-image"
                  className="h-full w-auto object-cover"
                />
              )}
              <div
                className={`absolute top-0 flex justify-between w-full ${
                  itemDetail[0].discount_percentage
                    ? "justify-between"
                    : "justify-end"
                }`}
              >
                {itemDetail[0].discount_percentage && (
                  <div className="text-sm sm:text-base bg-red-500 text-white font-semibold mt-2 px-2 shadow-2xl shadow-red-900">
                    {itemDetail[0].discount_percentage} % OFF
                  </div>
                )}
                <div className="flex text-lg sm:text-xl justify-end items-center">
                  {[...Array(itemDetail[0].rating.stars)].map((_, i) => {
                    return <AiFillStar key={i} className="text-yellow-400" />;
                  })}
                  {[...Array(5 - itemDetail[0].rating.stars)].map((_, i) => {
                    return (
                      <AiOutlineStar key={i} className="text-yellow-400" />
                    );
                  })}
                  <p className="text-xs text-gray-400 font-semibold mx-1">
                    ({itemDetail[0].rating.count})
                  </p>
                </div>
              </div>
            </div>
            {itemDetail[0].image && itemDetail[0].image.length > 1 && (
              <div className="flex md:flex-col gap-y-5 gap-x-2 justify-center mt-2 md:mr-1 h-full">
                {itemDetail[0].image.map((img, index) => (
                  <div
                    key={index}
                    className={`flex justify-center items-center h-10 sm:w-14 sm:h-12 cursor-pointer ${
                      imageIndex === index && "border-2 border-red-600"
                    }`}
                    onClick={() => setImageIndex(index)}
                  >
                    <img
                      src={`/${img}`}
                      alt="product-image"
                      className="max-w-full max-h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ImageView;
