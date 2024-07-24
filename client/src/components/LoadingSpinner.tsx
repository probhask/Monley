import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center w-full my-[50px]">
      <div className="animate-spin" role="status">
        <AiOutlineLoading3Quarters className="text-6xl" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
