import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { Items, ItemShimmer } from "../../components";
import { getFeaturedItems } from "../../store/slice/featuredItems";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Featured = () => {
  const featured = useAppSelector((state) => state.featuredItems.data);
  const featuredLoading = useAppSelector(
    (state) => state.featuredItems.isLoading
  );
  const featuredError = useAppSelector((state) => state.featuredItems.isError);
  const dispatch = useAppDispatch();
  const boxRef = useRef<HTMLDivElement>(null);

  const prevBtn = () => {
    if (boxRef.current) {
      boxRef.current.scrollLeft = boxRef.current?.scrollLeft - 250;
    }
  };
  const nextBtn = () => {
    if (boxRef.current) {
      boxRef.current.scrollLeft = boxRef.current?.scrollLeft + 250;
    }
  };

  useEffect(() => {
    const dispatchId = dispatch(getFeaturedItems());
    return () => dispatchId.abort();
  }, []);
  if (featuredLoading) {
    return (
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar my-7">
        {[1, 2, 3, 4].map(() => (
          <ItemShimmer />
        ))}
      </div>
    );
  }
  if (featuredError) {
    return (
      <div className="text-4xl font-bold my-7 text-center w-full">Error</div>
    );
  }

  return (
    <div className="my-7">
      <h1 className="text-lg h-full font-bold">Featured Products</h1>

      {/* <div className=" flex justify-center items-center">
        <div className=" flex items-center justify-center w-full md:w-[80%] lg:w-[70%]"> */}
      <div className=" flex relative overflow-hidden p-2 h-full">
        <button
          className="absolute top-[50%] translate-y-[-50%] left-0 flex justify-center items-center text-2xl px-1 py-1 rounded-full bg-[#00000047]  border-none shadow-md z-20 hover:bg-black hover:text-white active:scale-90 transition-all"
          onClick={prevBtn}
        >
          <AiOutlineLeft />
        </button>

        <div
          className="flex overflow-x-auto overflow-y-hidden hide-scrollbar scroll-smooth"
          ref={boxRef}
        >
          {featured &&
            featured.map((item, index) => (
              <Items key={index + item.productId} item={item} />
            ))}
        </div>
        <button
          className="absolute top-[50%] translate-y-[-50%] right-0 flex justify-center items-center text-2xl px-1 py-1 rounded-full bg-[#00000047]   border-none shadow-md z-20 hover:bg-black hover:text-white active:scale-90 transition-all"
          onClick={nextBtn}
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
};

export default Featured;
