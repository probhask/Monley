import useSearchItemNavigate from "../hooks/useSearchItemNavigate";

const PaginationButton = ({ totalPage }: { totalPage: number }) => {
  const {
    previousPage,
    nextPage,
    getCurrentPage,
    pageSearch,
    paginateButtonArray,
  } = useSearchItemNavigate();

  return (
    <div className="flex gap-x-5">
      <button
        className="px-2 py-0.5 bg-orange-700 hover:bg-orange-600 text-white flex justify-center items-center gap-x-1"
        onClick={previousPage}
      >
        prev
      </button>

      {/* large */}
      {!(totalPage === 0) && (
        <div className="flex">
          {paginateButtonArray.map((page, index) => (
            <button
              className={`w-6 h-full flex justify-center items-center text-orange-400 border border-orange-400 cursor-pointer font-bold ${
                getCurrentPage() === page ? "bg-orange-400 text-white" : ""
              }`}
              disabled={typeof page === "string"}
              key={index}
              onClick={() => typeof page === "number" && pageSearch(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
      <button
        className="px-2 py-0.5 bg-orange-700 hover:bg-orange-600 text-white flex justify-center items-center gap-x-1"
        onClick={nextPage}
      >
        next
      </button>
    </div>
  );
};

export default PaginationButton;
