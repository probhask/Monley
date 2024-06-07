import { useEffect } from "react";
import { Items, LoadingSpinner, PaginationButton } from "../components";
import { FilterSearch, SearchBar } from "../features";
import useSearchItemNavigate from "../hooks/useSearchItemNavigate";
import useSearchSlice from "../store/hooks/useSearchSlice";

export const Search = () => {
  const { getSearchData, getSearchTerm } = useSearchItemNavigate();
  const { searchItems, searchTotalPage, isSearching } = useSearchSlice();

  useEffect(() => {
    if (getSearchTerm()) {
      getSearchData();
    }
  }, []);
  return (
    <div className="flex flex-col flex-wrap justify-center items-center my-5 gap-y-2">
      <SearchBar />

      {/* filter */}
      <FilterSearch />

      {/* display message  */}
      {isSearching && <LoadingSpinner />}
      {!isSearching && searchTotalPage === 0 && (
        <div className="my-10 font-semibold">No product found</div>
      )}

      {/* */}
      {searchItems && (
        <div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-3 mb-5
        "
        >
          {searchItems.map((item, index) => (
            <Items key={index} item={item} />
          ))}
        </div>
      )}

      {/* pageination button */}
      {searchTotalPage > 0 && <PaginationButton totalPage={searchTotalPage} />}
    </div>
  );
};
export default Search;
