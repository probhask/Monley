import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";

type SearchInputFormProps = {
  value: string;
  setValue: (val: string) => void;
  onSubmitFunc: (e: React.FormEvent<HTMLFormElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const SearchInputForm = ({
  onSubmitFunc,
  onKeyUp,
  setValue,
  value,
  onFocus,
  onBlur,
}: SearchInputFormProps) => {
  return (
    <form className="max-w-full" onSubmit={onSubmitFunc}>
      <div className="flex justify-center h-10">
        <div className="flex items-center border-2  px-4 bg-white  w-full">
          <input
            type="text"
            name="search"
            value={value}
            className="outline-none focus:outline-none px-2 text-gray-600 font-semibold w-full"
            placeholder="search here..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value);
            }}
            autoComplete="off"
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyUp={onKeyUp}
          />
          {value && (
            <AiOutlineClose
              className="text-black cursor-pointer"
              onClick={() => setValue("")}
            />
          )}
        </div>
        <button
          type="submit"
          className="px-2 py-0.5 bg-orange-700 hover:bg-orange-600 text-white flex justify-center items-center gap-x-1"
        >
          <IoMdSearch />
          <p className="hidden sm:block">search</p>
        </button>
      </div>
    </form>
  );
};

export default SearchInputForm;
