import {
  BestSeller,
  Collections,
  DeliveryInfo,
  Featured,
  NewArrival,
  HeadBanner,
} from "../features";

const Landing = () => {
  return (
    <div>
      <HeadBanner />
      <div className="mt-7 mx-6 md:mx-14 lg:mx-28 gap-y-6">
        <Featured />
        <Collections />
        <NewArrival />
        <DeliveryInfo />
        <BestSeller />
      </div>
    </div>
  );
};

export default Landing;
