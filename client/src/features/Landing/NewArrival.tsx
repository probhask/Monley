import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getNewArrivalItems } from "../../store/slice/newArrivalItems";
import { Items, LoadingSpinner } from "../../components";

const NewArrival = () => {
  const [tab, setTab] = useState<1 | 2 | 3>(1);
  const newArrival = useAppSelector((state) => state.newArrival.data);
  const newArrivalLoading = useAppSelector(
    (state) => state.newArrival.isLoading
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNewArrivalItems());
  }, []);
  if (newArrivalLoading) {
    return <LoadingSpinner />;
  }
  if (newArrival) {
    return (
      <div className="flex flex-col gap-y-6 w-full mt-10">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-2 text-2xl font-bold">New Arrival</h1>
          <div className="w-12 h-0.5 bg-[#ff0000]"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 font-semibold">
          <div
            className={`cursor-pointer rounded-md px-3 ${
              tab === 1 ? "bg-[#ff0000] text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setTab(1)}
          >
            ALL
          </div>
          <div className="flex justify-center gap-x-6 font-semibold">
            <div
              className={`cursor-pointer rounded-md px-3 ${
                tab === 2 ? "bg-[#ff0000] text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => setTab(2)}
            >
              MEN
            </div>
            <div
              className={`cursor-pointer rounded-md px-3 ${
                tab === 3 ? "bg-[#ff0000] text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => setTab(3)}
            >
              WOMEN
            </div>
          </div>
        </div>

        <div className="flex sm:flex-wrap overflow-x-auto hide-scrollbar sm:justify-center md:gap-x-10">
          {newArrival &&
            newArrival.map((item, index) => <Items item={item} key={index} />)}
        </div>
      </div>
    );
  }
};

export default NewArrival;
