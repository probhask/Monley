import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getBanner } from "../../store/slice/bannerSlice";
import { Link } from "react-router-dom";
import { HeadBannerShimmer } from "../../components";

const HeadBanner = () => {
  const dispatch = useAppDispatch();
  const banner = useAppSelector((store) => store.banner.data);
  const bannerLoading = useAppSelector((store) => store.banner.isLoading);

  useEffect(() => {
    const dispatchId = dispatch(getBanner());
    return () => dispatchId.abort();
  }, []);

  if (bannerLoading) {
    return <HeadBannerShimmer />;
  }
  return (
    <div className="flex w-full h-[400px] items-center gap-x-6 head-banner px-5 sm:px-20">
      <div className="flex flex-col gap-y-2">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500">
          {banner?.largeText.toLocaleUpperCase()}
        </div>
        <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#ff0000]">
          {banner?.highlight}
        </div>
        <div className="text-md md:text-lg text-gray-500">
          {banner?.smallText}
        </div>
        <Link
          to={`shop`}
          className="bg-[#ff0000]/90 text-white font-semibold px-3 py-1.5 rounded-2xl hover:shadow-md hover:scale-110 w-fit"
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

export default HeadBanner;
