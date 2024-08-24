import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-[calc(100vh-64px-92px)] ">
      <div className="flex flex-col justify-center items-center max-w-[500px] w-full min-h-full  py-2 px-1 md:px-3">
        <div className="w-full text-center text-[#ea580c]">
          <h1 className="text-4xl font-bold  uppercase mb-3">Oops!</h1>
          <h2 className="text-xl  font-semibold">PAGE NOT FOUND</h2>
        </div>
        <div className="text-center mt-6">
          <p className="mb-5">
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>

          <Link
            to="/"
            className=" h-fit w-fit mx-auto text-xl py-2 px-3 flex justify-center items-center text-orange-400 border border-orange-400 cursor-pointer font-bold hover:bg-orange-400 hover:text-white rounded-md "
          >
            GO TO HOME PAGE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
