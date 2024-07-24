import React from "react";

const HeadBannerShimmer = React.memo(() => {
  return (
    <div className="w-full min-h-[250px] bg-gray-100 animate-pulse flex items-end pb-4 pl-3">
      <div className="flex flex-col gap-y-3 animate-pulse">
        <div className="min-h-8 bg-gray-200 w-52 rounded-lg mb-3" />
        <div className="min-h-5 bg-gray-200 w-40 rounded-lg" />
        <div className="min-h-5 bg-gray-200 w-28 rounded-xl" />
      </div>
    </div>
  );
});

HeadBannerShimmer.displayName = "HeadBannerShimmer";

export default HeadBannerShimmer;
