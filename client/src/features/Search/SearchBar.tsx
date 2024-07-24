import axios from "axios";
import useSearchItemNavigate from "../../hooks/useSearchItemNavigate";
import SearchInputForm from "./SearchInputForm";
import SearchSuggestion from "./SearchSuggestion";
import { useNavigate } from "react-router-dom";
import { Suggestion } from "../../types";
import { useCallback, useEffect, useRef, useState } from "react";
import useDetectOutSideClick from "../../hooks/useDetectOutSideClick";

const SearchBar = () => {
  const { setSearchTerm, search, getSearchTerm } = useSearchItemNavigate();

  const [inputTerm, setInputTerm] = useState<string>(getSearchTerm());
  const [displaySuggestion, setDisplaySuggestion] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const [suggestion, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // show suggestion
  const viewSuggesstion = () => {
    if (inputTerm.length > 0) {
      setDisplaySuggestion(true);
    }
  };
  // hide suggestion
  const hideSuggesstion = () => {
    setDisplaySuggestion(false);
  };
  const detectOtsideClick = useDetectOutSideClick(hideSuggesstion);

  // key navigation
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          // setSearchTerm(suggestion[selectedSuggestion].item_name);
          handleSuggestionClick(suggestion[selectedSuggestion].productId);
          hideSuggesstion();
        }
      } else if (e.key === "Escape") {
        hideSuggesstion();
      }
    } else {
      setSelectedSuggestion(-1);
    }
  };
  // input term search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTerm.length >= 1) {
      setSearchTerm(inputTerm);
      search();
      hideSuggesstion();
    }
  };
  const onInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTerm(e.target.value);
    viewSuggesstion();
  };

  const handleSuggestionClick = useCallback((productId: string) => {
    navigate(`/shop/product/${productId}`);
  }, []);

  const fetchSuggestion = async (query: string): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/search/suggestion`,
        {
          params: { searchTerm: query },
        }
      );

      const suggestion = (await response.data.search) as Suggestion[];
      setSuggestions(suggestion || []);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    const timeID = setTimeout(() => {
      if (inputTerm.length > 0) {
        fetchSuggestion(inputTerm);
      } else {
        setSuggestions([]);
      }
    }, 500);
    return () => clearInterval(timeID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTerm]);

  useEffect(() => {
    setInputTerm(getSearchTerm());
  }, [getSearchTerm()]);

  return (
    <div
      className={`bg-gray-100 w-[80%] md:w-[60%] lg-w[50%] flex flex-col justify-center relative my-3`}
      ref={detectOtsideClick}
    >
      <SearchInputForm
        value={inputTerm}
        setValue={onInputChnage}
        onSubmitFunc={handleSearch}
        onKeyUp={handleKey}
        onFocus={viewSuggesstion}
      />
      {inputTerm && displaySuggestion && (
        <SearchSuggestion
          selectedSuggestion={selectedSuggestion}
          suggestions={suggestion}
          highLighText={inputTerm}
          onSelect={handleSuggestionClick}
          ref={suggestionRef}
        />
      )}
      {loading && <div className="mx-auto">loading..</div>}
    </div>
  );
};

export default SearchBar;
