import React, { Suspense } from "react";
const Collections = React.lazy(() => import("../features/Landing/Collections"));
const DeliveryInfo = React.lazy(
  () => import("../features/Landing/DeliveryInfo")
);

const HeadBanner = React.lazy(() => import("../features/Landing/HeadBanner"));
const Featured = React.lazy(() => import("../features/Landing/Featured"));
const BestSeller = React.lazy(() => import("../features/Landing/BestSeller"));
import { HeadBannerShimmer, ItemShimmer } from "../components";

const Landing = () => {
  return (
    <div>
      <Suspense fallback={<HeadBannerShimmer />}>
        <HeadBanner />
      </Suspense>
      <div className="mt-7 mx-6 md:mx-14 lg:mx-28 gap-y-6">
        <Suspense
          fallback={
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar my-7">
              {[1, 2, 3, 4].map((index) => (
                <ItemShimmer key={index} />
              ))}
            </div>
          }
        >
          <Featured />
        </Suspense>

        <Suspense>
          <Collections />
        </Suspense>
        <Suspense>
          <DeliveryInfo />
        </Suspense>
        <Suspense
          fallback={
            <div className="flex items-center gap-2 overflow-x-hidden hide-scrollbar my-7">
              {[1, 2, 3, 4].map((index) => (
                <ItemShimmer key={index} />
              ))}
            </div>
          }
        >
          <BestSeller />
        </Suspense>
      </div>
    </div>
  );
};

export default Landing;
