import React, { useState } from "react";
import { Form } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import toast from "react-hot-toast";
import useDetectOutSideClick from "../../hooks/useDetectOutSideClick";
import useSearchItemNavigate from "../../hooks/useSearchItemNavigate";
import {
  getFilterSession,
  getFilterSessionByKey,
  resetFilterSession,
  setFilterSession,
} from "../../utils/sessionStorage";
import { Button, FormSelelct, MultiRange } from "../../components";

type FilterProps = {
  filterFalse: () => void;
};

const Filter = ({ filterFalse }: FilterProps) => {
  const filterOutsideRef = useDetectOutSideClick(filterFalse);
  const { search, getSearchTerm } = useSearchItemNavigate();

  const [selectCategoryList] = useState<string[]>([
    "all",
    "shirt",
    "tshirt",
    "top",
    "studs",
  ]);
  const filterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (getSearchTerm()) {
      const formData = new FormData(e.target as HTMLFormElement);
      const category = formData.get("category");
      const order = formData.get("order");
      const gender = formData.get("gender");
      const minPrice = formData.get("min");
      const maxPrice = formData.get("max");
      console.log(category, order, gender, minPrice, maxPrice);
      setFilterSession({
        category,
        order,
        gender,
        minPrice,
        maxPrice,
      });
      search();
      filterFalse();
    } else {
      toast.error("please provide search term");
    }
  };
  const filterReset = () => {
    resetFilterSession();
    search();
    window.location.reload();
  };

  return (
    <div className="absolute top-0 z-10" ref={filterOutsideRef}>
      <Form
        className="relative bg-gray-50 rounded-md px-8 py-4"
        onSubmit={filterSubmit}
        onReset={filterReset}
      >
        <div
          className="absolute right-2 top-2 w-fit"
          onClick={() => filterFalse()}
        >
          <AiOutlineClose className="text-black cursor-pointer" />
        </div>

        <div className="grid gap-x-4 gap-y-8 grid-cols-1  text-black justify-center items-center">
          {/* category */}
          <FormSelelct
            label="select category"
            name="category"
            list={selectCategoryList}
            defaultValue={
              (getFilterSession() &&
                getFilterSessionByKey<string>("category")) ||
              "all"
            }
          />
          {/* {sort by} */}
          <FormSelelct
            label="sort by"
            name="order"
            list={["asec", "desc"]}
            defaultValue={
              (getFilterSession() && getFilterSessionByKey<string>("order")) ||
              "asec"
            }
          />
          {/* gender */}
          <FormSelelct
            label="select gender"
            name="gender"
            list={["all", "male", "female"]}
            defaultValue={
              (getFilterSession() && getFilterSessionByKey<string>("gender")) ||
              "all"
            }
          />
          {/* price */}
          <MultiRange
            label="price range"
            min={300}
            max={5000}
            defaultValueMin={
              (getFilterSession() &&
                Number(getFilterSessionByKey<number>("minPrice"))) ||
              500
            }
            defaultValueMax={
              (getFilterSession() &&
                Number(getFilterSessionByKey<number>("maxPrice"))) ||
              5000
            }
          />
        </div>
        <div className="flex justify-center gap-x-3 mt-8">
          <Button
            type="submit"
            text="Filter"
            classes="w-full bg-orange-700 hover:bg-orange-600 text-white"
          />
          <Button
            type="reset"
            text="Reset"
            classes="w-full bg-orange-700 hover:bg-orange-600 text-white"
          />
        </div>
      </Form>
    </div>
  );
};

export default Filter;
