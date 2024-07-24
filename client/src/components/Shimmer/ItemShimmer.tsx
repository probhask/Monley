import React from "react";

const ItemShimmer = React.memo(() => {
  return (
    <div className="min-h-[330px] min-w-60 max-w-60 bg-gray-100 animate-pulse flex items-end">
      <div className="bg-gray-200 w-full min-h-16 animate-pulse  px-1 py-2">
        <div className="min-w-[60%] min-h-4 bg-gray-400/20 rounded-lg"></div>
        <div className="w-[90%] min-h-3 bg-gray-400/20 rounded-lg mt-2"></div>
      </div>
    </div>
  );
});
ItemShimmer.displayName = "ItemShimmer";

export default ItemShimmer;
