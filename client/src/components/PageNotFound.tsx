import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center my-5">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold mb-2">Oops!</h1>
          <h2 className="text-sm font-semibold">404 - PAGE NOT FOUND</h2>
        </div>
        <div className="w-[50%] text-center">
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>

          <Link
            to="/"
            className=" h-full text-xl py-2 flex justify-center items-center text-orange-400 border border-orange-400 cursor-pointer font-bold hover:bg-orange-400 hover:text-white my-6"
          >
            GOTO HOME PAGE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
