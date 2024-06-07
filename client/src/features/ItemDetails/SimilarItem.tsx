import { useEffect, useRef } from "react";
import { useAppDispatch } from "../../store/hooks/hooks";
import { getSimilarItems } from "../../store/slice/productDetail";
import useProductDetailSlice from "../../store/hooks/useProductDetailSlice";
import { Items, LoadingSpinner } from "../../components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const SimilarItem = () => {
  const dispatch = useAppDispatch();
  const { similarItems, similarItemsLoading } = useProductDetailSlice();

  const box = useRef<HTMLDivElement>(null);

  const prevBtn = () => {
    if (box.current) {
      const width = box.current?.clientWidth;
      box.current.scrollLeft = box.current?.scrollLeft - width;
    }
  };
  const nextBtn = () => {
    if (box.current) {
      const width = box.current?.clientWidth;
      box.current.scrollLeft = box.current?.scrollLeft + width;
    }
  };

  useEffect(() => {
    const promise = dispatch(getSimilarItems());
    return () => promise.abort();
  }, []);

  if (similarItemsLoading) return <LoadingSpinner />;
  return (
    <div className=" flex flex-col justify-center my-2">
      {similarItems && similarItems.length >= 1 && (
        <>
          <h1 className="text-center mb-2 text-2xl font-semibold uppercase mt-2">
            Similar Products
          </h1>
          <div className=" flex justify-center items-center">
            <div className=" flex items-center justify-center w-full md:w-[80%] lg:w-[70%]">
              <div className=" flex relative overflow-hidden p-2">
                <button
                  className="absolute top-[50%] translate-y-[-50%] left-0 flex justify-center items-center text-2xl px-1 py-1 rounded-full bg-[#00000047]  border-none shadow-md z-20"
                  onClick={prevBtn}
                >
                  <AiOutlineLeft />
                </button>

                <div
                  className=" flex items-center overflow-hidden  scroll-smooth hide-scrollbar gap-x-2"
                  ref={box}
                >
                  {similarItems.length > 0 &&
                    similarItems.map((similarItems, index) => (
                      <Items key={index} item={similarItems} />
                    ))}
                </div>

                <button
                  className="absolute top-[50%] translate-y-[-50%] right-0 flex justify-center items-center text-2xl px-1 py-1 rounded-full bg-[#00000047]   border-none shadow-md z-20"
                  onClick={nextBtn}
                >
                  <AiOutlineRight />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SimilarItem;
