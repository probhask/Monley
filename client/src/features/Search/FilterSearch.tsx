import { ReactElement, useState } from "react";
import { AiFillFilter } from "react-icons/ai";
import Filter from "./Filter";

const FilterSearch = (): ReactElement => {
  const [filterState, setFilterState] = useState<boolean>(false);

  const filterFalse = (): void => {
    setFilterState(false);
  };
  const filterTrue = (): void => {
    setFilterState(true);
  };

  return (
    <div className="relative flex justify-end w-[80%]">
      <div
        className="flex items-center gap-x-2 font-semibold bg-gray-200 px-2 py-0.5 cursor-pointer hover:scale-105 self-end text-black"
        onClick={filterTrue}
      >
        <AiFillFilter className="text-gray-500" />
        Filter
      </div>
      {filterState && <Filter filterFalse={filterFalse} />}
    </div>
  );
};

export default FilterSearch;
