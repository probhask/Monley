import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import toast from "react-hot-toast";
import { getSearchItem } from "../store/slice/searchSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect } from "react";
import { returnPaginationRange } from "../utils/paginationRangeArray";

type UseSearchItemNavigateReturnType = {
  nextPage: () => void;
  previousPage: () => void;
  getSearchData: () => void;
  setSearchTerm: (searchTerm: string) => void;
  search: () => void;
  getSearchTerm: () => string;
  getCurrentPage: () => number;
  pageSearch: (page: number) => void;
  paginateButtonArray: (string | number)[];
};
/**
 * url based Pagination hook
 */
const useSearchItemNavigate = (): UseSearchItemNavigateReturnType => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPage = useAppSelector((state) => state.search.totalPage);
  const dispatch = useAppDispatch();

  const getSearchTerm = (): string => {
    return searchParams.get("query") || "";
  };
  const getCurrentPage = (): number => {
    return Number(searchParams.get("page")) || 1;
  };

  const getSearchData = (): void => {
    if (Number(window.location.search.slice(1).split("=")[2])) {
      const query = window.location.search.slice(1).split("=")[1].split("&")[0];
      dispatch(
        getSearchItem({
          searchTerm: query,
          page: 1,
        })
      );
    }
  };

  const previousPage = (): void => {
    if (getCurrentPage() !== 1) {
      setSearchParams(
        (prev) => {
          prev.set("query", searchParams.get("query") || "");
          prev.set("page", (getCurrentPage() - 1).toString() || "1");
          return prev;
        },
        { replace: true }
      );
      dispatch(
        getSearchItem({
          searchTerm: searchParams.get("query") || "",
          page: Number(searchParams.get("page")),
        })
      );

      // window.history.pushState(
      //   null,
      //   "",
      //   `?query=${searchParams.get("query") || ""}&page=${(
      //     getCurrentPage() || 1 - 1
      //   ).toString()}`
      // );
    } else {
      toast.success("no page back", {
        icon: <AiOutlineArrowLeft />,
      });
    }
  };
  const nextPage = (): void => {
    if (getCurrentPage() === totalPage) {
      toast.success("last page");
    } else {
      setSearchParams(
        (prev) => {
          prev.set("query", searchParams.get("query") || "");
          prev.set("page", (getCurrentPage() + 1).toString() || "1");
          return prev;
        },
        { replace: true }
      );

      dispatch(
        getSearchItem({
          searchTerm: searchParams.get("query") || "",
          page: getCurrentPage(),
        })
      );

      // window.history.pushState(
      //   null,
      //   "",
      //   `?query=${searchParams.get("query") || ""}&page=${(
      //     Number(searchParams.get("page")) || 1 + 1
      //   ).toString()}`
      // );
    }
  };

  const setSearchTerm = (searchTerm: string): void => {
    setSearchParams(
      (prev) => {
        prev.set("query", searchTerm);
        prev.set("page", "1");
        return prev;
      },
      { replace: true }
    );
  };

  /* initail Search */
  const search = (): void => {
    dispatch(getSearchItem({ searchTerm: getSearchTerm() }));
    window.history.pushState(
      null,
      "",
      `?query=${searchParams.get("query") || ""}&page=1`
    );
  };
  const pageSearch = (page: number): void => {
    dispatch(getSearchItem({ searchTerm: getSearchTerm(), page: page }));
    setSearchParams(
      (prev) => {
        prev.set("page", page.toString());
        return prev;
      },
      { replace: true }
    );
    // window.history.pushState(
    //   null,
    //   "",
    //   `?query=${searchParams.get("query") || ""}&page=${page.toString()}`
    // );
  };

  const paginateButtonArray = returnPaginationRange(
    totalPage,
    getCurrentPage(),
    1
  );

  useEffect(() => {
    window.addEventListener("popstate", getSearchData);
    return () => window.removeEventListener("popstate", getSearchData);
  }, []);

  return {
    nextPage,
    previousPage,
    getSearchData,
    setSearchTerm,
    search,
    getCurrentPage,
    getSearchTerm,
    pageSearch,
    paginateButtonArray,
  };
};

export default useSearchItemNavigate;
