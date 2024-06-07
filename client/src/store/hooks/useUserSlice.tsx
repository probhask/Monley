import { useAppSelector } from "./hooks";

const useUserSlice = () => {
  const user = useAppSelector((state) => state.user.data);
  const userLoading = useAppSelector((state) => state.user.isLoading);
  const loginStatus = useAppSelector((state) => state.user.loginStatus);
  const darkMode = useAppSelector((state) => state.user.darkMode);
  const userError = useAppSelector((state) => state.user.isError);

  const detailUser = useAppSelector((state) => state.detailUser.data);
  const detailUserLoading = useAppSelector(
    (state) => state.detailUser.isLoading
  );
  const detailUserError = useAppSelector((state) => state.detailUser.isError);

  return {
    user,
    userLoading,
    loginStatus,
    darkMode,
    userError,
    detailUser,
    detailUserLoading,
    detailUserError,
  };
};

export default useUserSlice;
