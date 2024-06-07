import React, { memo } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

type FormInputProps = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  error: string | undefined;
};

const FormInput = ({
  type,
  label,
  placeholder,
  name,
  value,
  setValue,
  error,
}: FormInputProps) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full my-4 px-4 lg:px-5 gap-x-0.5 md:gap-x-2 ">
        <label
          htmlFor={name}
          className="cursor-pointer w-full  text-xs sm:text-sm  md:text-lg font-semibold"
        >
          <span>{label.toLocaleUpperCase()} </span>
        </label>
        <div className="flex flex-col w-full sm:min-w-[70%]">
          <div className="border flex items-center w-full sm:min-w-[70%] h-9 bg-white text-black focus-within:border-4 focus-within:scale-105 focus-within:border-orange-600 focus-within:shadow-inner my-auto mt-1 sm:mt-auto">
            <input
              type={type}
              name={name}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              id={name}
              placeholder={placeholder}
              className="outline-none px-2 w-full"
            />
          </div>
          {error && (
            <div className="text-xs bg-[#ff0000] text-white px-1 py-1">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(FormInput);
