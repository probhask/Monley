import { useEffect, useState } from "react";
import { Button, FormInput, FormPassWordInput } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { validatLogin } from "../utils/validateLoginForm";
import { loginUser } from "../store/actions/userAction";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFormDataError, setLoginFormDataError] = useState<{
    email: string | undefined;
    password: string | undefined;
  }>();
  const [tryingLogin, setTryingLogin] = useState<boolean>(false);
  const isLoggingIn = useAppSelector((state) => state.user.isLoading);
  const loginStatus = useAppSelector((state) => state.user.loginStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const result = validatLogin({ email, password });
    if (!result.success) {
      // console.log("Invalid");
      setLoginFormDataError({
        email: result.error?.email,
        password: result.error?.password,
      });
    } else {
      // console.log("valid");
      setTryingLogin(true);
      dispatch(loginUser({ email, password }));
    }
  };

  useEffect(() => {
    if (tryingLogin && loginStatus) {
      navigate("/", { replace: true });
    }
  }, [loginStatus]);

  return (
    <div className="w-full h-full flex justify-center items-start bg-orange-400">
      <div className="w-full flex justify-center my-10">
        <div className="border-4 border-orange-700 bg-orange-500 flex flex-col justify-center w-[70%]">
          <h1 className="text-2xl font-bold text-center my-5">LOGIN</h1>
          <form className="" onSubmit={handleLoginSubmit}>
            <div className="flex flex-col items-center">
              <FormInput
                label="email"
                name="email"
                type="text"
                value={email}
                setValue={setEmail}
                placeholder="enter email"
                error={loginFormDataError?.email}
              />
              <FormPassWordInput
                label="password"
                name="password"
                value={password}
                setValue={setPassword}
                placeholder="enter password"
                error={loginFormDataError?.password}
              />
              <Link
                to={`/create-account`}
                className="mx-4 self-start font-semibold text-blue-900 text-sm md:text-base"
              >
                create new account
              </Link>

              <Button
                type="submit"
                classes={`w-[70%] text-center bg-orange-800 hover:bg-orange-600 my-5 py-1.5 px-2 rounded-md font-semibold text-lg ${
                  isLoggingIn ? "bg-gray-500 text-white hover:bg-gray-300" : ""
                }`}
                disabled={isLoggingIn}
                text={isLoggingIn ? "...." : "login"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
