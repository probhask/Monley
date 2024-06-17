import { IoPersonCircleSharp } from "react-icons/io5";
import {
  AiFillCloseCircle,
  AiFillMoon,
  AiFillSun,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { NavLink } from "react-router-dom";
import useDetectOutSideClick from "../../hooks/useDetectOutSideClick";
import { logout } from "../../store/slice/userSlice";
import { IoIosLogOut, IoMdPersonAdd } from "react-icons/io";
import useChangeTheme from "../../hooks/useChangeTheme";

type SideBarProps = {
  toggleSideBar?: boolean;
  setToggleSideBar: (val: boolean) => void;
};
const SideBar = ({ setToggleSideBar }: SideBarProps) => {
  const user = useAppSelector((state) => state.user.data);
  const cartLength = useAppSelector((state) => state.cart.data.length);
  const loginStatus = useAppSelector((state) => state.user.loginStatus);
  const darkMode = useAppSelector((state) => state.user.darkMode);
  const sideBarRef = useDetectOutSideClick(() => setToggleSideBar(false));
  const changeThemeMode = useChangeTheme();

  const dispatch = useAppDispatch();

  return (
    <div
      className="fixed top-0 z-50  w-[90%] sm:w-[50%] bg-white dark:bg-black h-svh shadow-2xl transition-all animate-slide-in overflow-y-auto hide-scrollbar"
      ref={sideBarRef}
    >
      <div className="relative w-full bg-orange-400 dark:bg-orange-950 pt-4 pl-4 pb-2 text-white shadow-sm flex flex-col">
        <AiFillCloseCircle
          className="absolute top-5 right-5 text-2xl cursor-pointer text-orange-900"
          onClick={() => setToggleSideBar(false)}
        />

        {loginStatus ? (
          <NavLink
            to={`${user && loginStatus && "user-profile"}`}
            className="w-14 h-14 rounded-full flex items-center justify-center mr-3 mb-1 bg-purple-50 overflow-hidden shadow-md"
            onClick={() => setToggleSideBar(false)}
          >
            {user && user.image ? (
              <img src={user.image} />
            ) : (
              <IoPersonCircleSharp className="w-full h-full text-gray-500 cursor-pointer" />
            )}
          </NavLink>
        ) : (
          <NavLink
            to="/"
            className="text-2xl font-bold dark:text-white"
            onClick={() => setToggleSideBar(false)}
          >
            <span>MON</span>
            <span className="text-orange-600 mr-2 ">Ley</span>
          </NavLink>
        )}

        {user && loginStatus && (
          <div>
            <p className="font-bold text-lg">{user?.name}</p>
            <p className=" font-semibold">{user?.email}</p>
          </div>
        )}
      </div>

      <div className=" relative flex flex-col gap-y-5 font-semibold text-gray-600 dark:text-gray-300">
        <div
          className=" flex items-center cursor-pointer py-4 border-b-2  pl-3 "
          onClick={changeThemeMode}
        >
          {darkMode ? (
            <AiFillSun className="text-yellow-200 text-2xl" />
          ) : (
            <AiFillMoon className="text-white text-2xl" />
          )}
          <p>{darkMode ? "Light Mode" : "Dark Mode"}</p>
        </div>
        <NavLink
          to="/"
          className="flex items-center  pl-3 "
          onClick={() => setToggleSideBar(false)}
        >
          <AiOutlineHome className="text-2xl mr-3" />
          <p>Home</p>
        </NavLink>

        <NavLink
          to="shop"
          className="flex items-center pl-3"
          onClick={() => setToggleSideBar(false)}
        >
          <AiOutlineShopping className="text-2xl mr-3" />
          <p>Shop</p>
        </NavLink>

        {loginStatus && (
          <NavLink
            to="cart"
            className="flex items-center pl-3"
            onClick={() => setToggleSideBar(false)}
          >
            <AiOutlineShoppingCart className="text-2xl mr-3" />
            <p>Cart</p>
            <p className="ml-2 text-black dark:text-white bg-red-700 w-5 h-5 flex justify-center items-center rounded-full">
              {cartLength}
            </p>
          </NavLink>
        )}

        {user && loginStatus ? (
          <div
            className="flex items-center border-t-2 pt-3 cursor-pointer pl-3"
            onClick={() => dispatch(logout())}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 ">
              <IoIosLogOut className="text-lg font-bold text-gray-800" />
            </div>
            <p>LOGOUT</p>
          </div>
        ) : (
          <div className="flex flex-col  border-t-2 pt-3 cursor-pointer pl-3">
            <NavLink
              to="create-account"
              className="flex cursor-pointer"
              onClick={() => setToggleSideBar(false)}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
                <IoMdPersonAdd className="text-lg font-bold text-gray-800 dark:text-gray-300" />
              </div>
              <p>Create New Account</p>
            </NavLink>

            <NavLink
              to="login"
              className="flex items-center cursor-pointer"
              onClick={() => setToggleSideBar(false)}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
                <AiOutlineLogin className="text-lg font-bold text-gray-800 dark:text-gray-300" />
              </div>
              <p>Login</p>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
