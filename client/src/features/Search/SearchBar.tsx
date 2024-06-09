import axios from "axios";
import useSearchItemNavigate from "../../hooks/useSearchItemNavigate";
import SearchInputForm from "./SearchInputForm";
import SearchSuggestion from "./SearchSuggestion";
import { useNavigate } from "react-router-dom";
import { Suggestion } from "../../types";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const SearchBar = () => {
  const { setSearchTerm, search, getSearchTerm } = useSearchItemNavigate();
  const [displaySuggestion, setDisplaySuggestion] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const [suggestion, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const staticData: Suggestion[] = useCallback(
    JSON.parse(localStorage.getItem("monleySuggestion") as string) || [],
    [search]
  );

  const viewSuggesstion = () => {
    if (getSearchTerm().length > 0) {
      setDisplaySuggestion(true);
    }
  };
  const hideSuggesstion = () => {
    setDisplaySuggestion(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(e);
    // console.log(suggestionRef.current?.clientHeight);

    if (selectedSuggestion < suggestion.length) {
      if (e.key === "ArrowUp" && selectedSuggestion > 0) {
        setSelectedSuggestion((prev) => prev - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedSuggestion < suggestion.length - 1
      ) {
        setSelectedSuggestion((prev) => prev + 1);
      } else if (e.key === "Enter" && selectedSuggestion >= 0) {
        if (selectedSuggestion > -1) {
          setSearchTerm(suggestion[selectedSuggestion].item_name);
          handleSuggestionClick(suggestion[selectedSuggestion].item_name);

          setDisplaySuggestion(false);
        }
      } else if (e.key === "Escape") {
        setDisplaySuggestion(false);
      }
    } else {
      setSelectedSuggestion(-1);
    }
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (getSearchTerm().length >= 1) {
      search();
      setDisplaySuggestion(false);
    }
  };
  const onInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDisplaySuggestion(true);
  };

  const fetchSuggestion = async (query: string): Promise<Suggestion[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/search/suggestion`,
      {
        params: { searchTerm: query },
      }
    );

    const suggestion = response.data.search as Suggestion[];
    if (suggestion) {
      localStorage.setItem("monleySuggestion", JSON.stringify(suggestion));
    }
    return suggestion;
  };

  const handleSuggestionClick = (item_name: string) => {
    search();
    // navigate(`/shop/product/${productId}`);
  };

  const fetchSuggestionFunc = async () => {
    setLoading(true);
    setError("");
    try {
      let result;
      if (staticData && staticData.length > 0) {
        result = staticData.filter((item) => {
          return item.item_name
            .toLowerCase()
            .includes(getSearchTerm().toLowerCase());
        });
      } else if (fetchSuggestion) {
        result = await fetchSuggestion(getSearchTerm());
      }
      // console.log("resp", result);
      setSuggestions(result || []);
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
      if (getSearchTerm().length > 0) {
        fetchSuggestionFunc();
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearInterval(timeID);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSearchTerm()]);
  useEffect(() => {
    setDisplaySuggestion(false);
  }, []);

  return (
    <div
      className={`bg-gray-400 w-[80%] md:w-[60%] lg-w[50%] flex flex-col justify-center relative my-3`}
    >
      <SearchInputForm
        value={getSearchTerm()}
        setValue={setSearchTerm}
        onSubmitFunc={handleSearch}
        onKeyUp={handleKey}
        onFocus={viewSuggesstion}
        onBlur={hideSuggesstion}
      />
      {getSearchTerm() && displaySuggestion && (
        <SearchSuggestion
          selectedSuggestion={selectedSuggestion}
          suggestions={suggestion}
          highLighText={getSearchTerm()}
          onSelect={handleSuggestionClick}
          ref={suggestionRef}
        />
      )}
    </div>
  );
};

export default SearchBar;
