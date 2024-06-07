/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type SearchSuggestionProps = {
  inputValue: string;
  onclickFunc: (productId: string) => void;
};

const SearchSuggestion = ({
  inputValue,
  onclickFunc,
}: SearchSuggestionProps) => {
  // console.log(inputValue, onclickFunc);
  const [suggestion, setSuggestions] = useState<
    { productId: string; item_name: string }[]
  >([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSuggestion = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/search/suggestion`,
        {
          params: { searchTerm: inputValue },
        }
      );
      const suggestion = response.data.search as {
        productId: string;
        item_name: string;
      }[];
      console.log("resp", response.data);
      setSuggestions(suggestion);
    } catch (error) {
      if (axios.isAxiosError(error)) setError(error.message);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    const timeID = setTimeout(() => {
      if (inputValue) {
        fetchSuggestion();
      }
    }, 1000);
    return () => clearInterval(timeID);
  }, [inputValue]);

  return (
    <div className="bg-gray-50 shadow-md w-full absolute top-10 z-10 h-[150px] overflow-hidden">
      <div className="overflow-auto">
        <div className="flex flex-col overflow-auto hide-scrollbar w-full">
          {suggestion &&
            suggestion.length > 0 &&
            suggestion.map((suggestion, index) => (
              <div
                key={index}
                className="text-base text h-8 border-b-2 border-gray-300 cursor-pointer"
                onClick={() => onclickFunc(suggestion.productId)}
              >
                {suggestion.item_name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestion;
