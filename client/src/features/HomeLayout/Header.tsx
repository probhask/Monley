import { useEffect, useState } from "react";
import {
  AiFillMoon,
  AiFillSun,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoMdPerson, IoMdSearch } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { logout } from "../../store/slice/userSlice";
import { getCart } from "../../store/actions/cartAction";
import useChangeTheme from "../../hooks/useChangeTheme";
import useDetectOutSideClick from "../../hooks/useDetectOutSideClick";

type HeaderProps = {
  toggleSideBar: boolean;
  setToggleSideBar: (val: boolean) => void;
};

const Header = ({ toggleSideBar, setToggleSideBar }: HeaderProps) => {
  const [userIconOptionn, setUserIconOptionn] = useState<boolean>(false);
  const userIconRef = useDetectOutSideClick(() => setUserIconOptionn(false));
  const [signUpOptions, setSignUpOptions] = useState<boolean>(false);
  const signUpRef = useDetectOutSideClick(() => setSignUpOptions(false));
  const darkMode = useAppSelector((state) => state.user.darkMode);
  const cartItem = useAppSelector((state) => state.cart.data);
  const changeThemeMode = useChangeTheme();

  const loginStatus = useAppSelector((state) => state.user.loginStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleVisitProfile = (): void => {
    setUserIconOptionn(false);
    navigate("/user-profile");
  };

  const hanleLogout = (): void => {
    dispatch(logout());
    setUserIconOptionn(false);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <nav
      className="flex items-center justify-between h-16  px-4 md:px-6"
      onClick={() => setUserIconOptionn(false)}
    >
      <div className=" text-2xl font-bold md:hidden cursor-pointer">
        <AiOutlineMenu onClick={() => setToggleSideBar(!toggleSideBar)} />
      </div>
      <div className="text-2xl font-bold dark:text-white">
        <Link to="/">
          <span>MON</span>
          <span className="text-orange-600 mr-2">Ley</span>
        </Link>
      </div>
      <div className="hidden md:flex gap-x-3 md:gap-x-10 font-semibold  ">
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/shop">SHOP</NavLink>
        {!loginStatus && (
          <div className="relative ">
            <p
              className="text-base font-semibold cursor-pointer"
              onClick={() => setSignUpOptions(!signUpOptions)}
            >
              SIGN UP
            </p>
            {signUpOptions && (
              <div
                className="absolute top-10 -left-8 z-50 bg-white text-lg text-gray-600 font-semibold  shadow-lg rounded-md px-2 py-2"
                ref={signUpRef}
              >
                <ul className="space-y-1.5 min-w-[130px]">
                  <li className="hover:bg-gray-100 ">
                    <Link to="/login" onClick={() => setSignUpOptions(false)}>
                      Login
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100">
                    <Link
                      to="create-account"
                      onClick={() => setSignUpOptions(false)}
                    >
                      Create Account
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div className=" flex gap-x-2 text-xl md:text-2xl">
        <Link
          to="/search"
          className="rounded-full bg-gray-100 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center dark:bg-slate-600 "
        >
          <IoMdSearch className="text-slate-800 dark:text-gray-200" />
        </Link>

        <div
          className="rounded-full bg-gray-100 w-6 h-6 md:w-8 md:h-8 hidden md:flex items-center justify-center dark:bg-slate-600 cursor-pointer"
          onClick={changeThemeMode}
        >
          {darkMode ? (
            <AiFillSun className="text-yellow-400" />
          ) : (
            <AiFillMoon className="text-white" />
          )}
        </div>
        {loginStatus && (
          <div
            className="relative rounded-full bg-gray-100 w-6 h-6 md:w-8 md:h-8 hidden md:flex items-center justify-center dark:bg-slate-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setUserIconOptionn(!userIconOptionn);
            }}
          >
            <IoMdPerson className="text-gray-700 dark:text-gray-200" />
            {userIconOptionn && (
              <div
                className="absolute top-10 right-0 z-50 bg-white text-lg text-gray-600 font-semibold py-1 shadow-lg rounded-md"
                ref={userIconRef}
              >
                <ul className="space-y-1.5">
                  <li
                    onClick={handleVisitProfile}
                    className="hover:bg-gray-100 px-8"
                  >
                    Profile
                  </li>
                  <li onClick={hanleLogout} className="hover:bg-gray-100 px-8">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        {loginStatus && (
          <div className="relative rounded-full bg-gray-100 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center dark:bg-slate-600 ">
            <Link to={`/cart`} className="text-base font-semibold text-red-600">
              <AiOutlineShoppingCart />
            </Link>
            <div className=" absolute -top-3 -right-3 w-5 h-5 text-sm font-bold bg-red-600 text-black rounded-full flex justify-center items-center">
              {cartItem.length}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
