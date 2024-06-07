import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slice/userSlice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);
};

export default Logout;
