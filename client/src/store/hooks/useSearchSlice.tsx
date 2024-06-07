import { useAppSelector } from "./hooks";

const useSearchSlice = () => {
  const searchItems = useAppSelector((state) => state.search.data);
  const isSearching = useAppSelector((state) => state.search.isSearching);
  const searchError = useAppSelector((state) => state.search.isError);
  const searchTotalPage = useAppSelector((state) => state.search.totalPage);
  const searchTotalResult = useAppSelector((state) => state.search.totalResult);
  const searchLimit = useAppSelector((state) => state.search.limit);
  return {
    searchItems,
    isSearching,
    searchError,
    searchTotalPage,
    searchTotalResult,
    searchLimit,
  };
};

export default useSearchSlice;
