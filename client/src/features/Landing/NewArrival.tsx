import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getNewArrivalItems } from "../../store/slice/newArrivalItems";
import { Items, LoadingSpinner } from "../../components";

const NewArrival = () => {
  // const [tab, setTab] = useState<1 | 2 | 3>(1);
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
  if (newArrival && newArrival.length > 0) {
    return (
      <div className="flex flex-col gap-y-6 w-full mt-10">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-2 text-2xl font-bold">New Arrival</h1>
          <div className="w-12 h-0.5 bg-[#ff0000]"></div>
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
