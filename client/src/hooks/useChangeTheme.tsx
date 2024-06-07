import { changeTheme } from "../store/actions/userAction";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { changeThemeOffline } from "../store/slice/userSlice";
type UseChangeThemeReturn = () => void;

const useChangeTheme = (): UseChangeThemeReturn => {
  const loginStatus = useAppSelector((state) => state.user.loginStatus);
  const dispatch = useAppDispatch();

  const changeThemeMode = (): void => {
    if (loginStatus) {
      dispatch(changeTheme());
    } else {
      dispatch(changeThemeOffline());
    }
  };
  return changeThemeMode;
};

export default useChangeTheme;
