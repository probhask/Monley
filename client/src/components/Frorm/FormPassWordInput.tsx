import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type FormPassWordInputProps = {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  error: string | undefined;
};

const FormPassWordInput = ({
  label,
  placeholder,
  name,
  value,
  setValue,
  error,
}: FormPassWordInputProps) => {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full my-4 px-3 lg:px-5 gap-x-0.5 md:gap-x-2 ">
        <label
          htmlFor={name}
          className="cursor-pointer w-full text-xs sm:text-sm md:text-lg font-semibold"
        >
          <span>{label.toLocaleUpperCase()} </span>
        </label>
        <div className="flex flex-col w-full sm:min-w-[70%]">
          <div className="border flex justify-between items-center w-full sm:min-w-[70%]  h-9 bg-white text-black focus-within:border-4 focus-within:scale-105 focus-within:border-orange-600  focus-within:shadow-inner my-auto mt-1 sm:mt-auto">
            <input
              type={`${showPassword ? "text" : "password"}`}
              name={name}
              id={name}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
              }}
              placeholder={placeholder}
              className="outline-none px-2 w-full"
            />
            <div className="cursor-pointer text-xl dark:text-black w-fit shrink">
              {showPassword ? (
                <AiFillEye onClick={() => setshowPassword(false)} />
              ) : (
                <AiFillEyeInvisible onClick={() => setshowPassword(true)} />
              )}
            </div>
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

export default FormPassWordInput;
