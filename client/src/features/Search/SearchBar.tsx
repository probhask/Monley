import useSearchItemNavigate from "../../hooks/useSearchItemNavigate";
import SearchInputForm from "./SearchInputForm";
// import { useNavigate } from "react-router-dom";
// import SearchSuggestion from "./SearchSuggestion";

const SearchBar = () => {
  const { setSearchTerm, search, getSearchTerm } = useSearchItemNavigate();
  // const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (getSearchTerm().length >= 1) {
      search();
    }
  };

  // const handleSuggestionClick = (productId: string) => {
  //   navigate(`/shop/product/${productId}`);
  // };

  return (
    <div
      className={`bg-gray-400 w-[80%] md:w-[60%] lg-w[50%] flex flex-col justify-center relative my-3`}
    >
      <SearchInputForm
        value={getSearchTerm()}
        setValue={setSearchTerm}
        onSubmitFunc={handleSearch}
      />
      {/* {getSearchTerm() && (
        <SearchSuggestion
          inputValue={getSearchTerm()}
          onclickFunc={handleSuggestionClick}
        />
      )} */}
    </div>
  );
};

export default SearchBar;
