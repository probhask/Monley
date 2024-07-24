import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { IoMdPerson } from "react-icons/io";
import { getDetailUser } from "../store/slice/detailUser";
import { LoadingSpinner } from "../components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getUserOrderList } from "../store/slice/order";
import useUserSlice from "../store/hooks/useUserSlice";
import { OrdersContainer } from "../features";

const Profile = () => {
  const { loginStatus, detailUser, detailUserLoading } = useUserSlice();
  const cartLen = useAppSelector((state) => state.cart.data.length);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loginStatus) {
      dispatch(getDetailUser());
      dispatch(getUserOrderList());
    }
  }, []);
  if (detailUserLoading) {
    return <LoadingSpinner />;
  }

  if (loginStatus && !detailUserLoading && detailUser) {
    return (
      <div className="flex justify-center items-center w-full px-5 py-5">
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-center gap-x-6 my-5 justify-center">
            <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden">
              {detailUser.image ? (
                <img src={detailUser?.image} alt="" />
              ) : (
                <IoMdPerson className="w-full h-full" />
              )}
            </div>
            <div className=" flex flex-col gap-y-1 items-center text-md mt-5">
              <div className="font-bold text-2xl">{detailUser.name}</div>
              <div>{detailUser.email}</div>
              <div>{detailUser.address}</div>
            </div>
          </div>

          {/* other ingfo */}
          <div className="flex flex-col items-center gap-y-5 mt-5">
            <Link
              to="/cart"
              className=" w-[150px] flex justify-evenly items-center h-16 bg-[#ff0000] text-white text-xl lg:text4xl font-bold  active:scale-90 rounded-md"
            >
              cart
              <div className="relative">
                <AiOutlineShoppingCart className="h-10 w-10" />
                <p className="text-xl absolute -top-2 -right-2 bg-black w-7 h-7 rounded-full flex justify-center items-center">
                  {cartLen}
                </p>
              </div>
            </Link>
            {/* order history */}
            <OrdersContainer />
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
