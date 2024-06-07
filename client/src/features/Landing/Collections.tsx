import { Link } from "react-router-dom";

const Collections = () => {
  return (
    <div className="flex h-56 w-full overflow-auto hide-scrollbar gap-x-3 md:gap-x-6 md:mx-6 items-center sm:justify-center">
      <Link
        to="/"
        className="relative men h-full w-[250px] sm:w-350 flex justify-center items-center shrink-0"
      >
        <div className="absolute w-full h-full hover:bg-blackOverlay flex justify-center items-center shrink-0">
          <p className="bg-white text-black font-semibold px-3 py-0.5 cursor-pointer">
            MEN
          </p>
        </div>
      </Link>

      <Link
        to="/"
        className="relative women h-full flex justify-center items-center w-350 shrink-0"
      >
        <div className="absolute w-full h-full hover:bg-blackOverlay flex justify-center items-center">
          <p className="bg-white text-black font-semibold px-3 py-0.5 cursor-pointer">
            WOMEN
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Collections;
