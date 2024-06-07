import React, { useEffect, useState } from "react";
import { Button, FormInput, FormPassWordInput } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { validatCreateAccount } from "../utils/validateLoginForm";
import { createUser } from "../store/actions/userAction";

const CreateAccount = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createFormError, setCreateFormError] = useState<{
    email: string;
    password: string;
    name: string;
    address: string;
  }>();

  const loginStatus = useAppSelector((state) => state.user.loginStatus);
  const isCreating = useAppSelector((state) => state.user.isLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const result = validatCreateAccount({ name, address, password, email });
    setCreateFormError(undefined);
    if (!result.success) {
      // console.log("invalid");
      if (result.error) {
        setCreateFormError({
          name: result.error?.name,
          address: result.error?.address,
          password: result.error?.password,
          email: result.error?.email,
        });
      }
    } else {
      // console.log("valid");
      dispatch(
        createUser({
          name: name.trim(),
          address: address.trim(),
          email: email.trim(),
          password: password.trim(),
        })
      );
    }
  };

  useEffect(() => {
    if (loginStatus) {
      navigate("/", { replace: true });
    }
  }, [loginStatus]);
  return (
    <div className="w-full h-full flex justify-center items-start bg-orange-400">
      <div className="w-full flex justify-center my-10">
        <div className="border-4 border-orange-700 bg-orange-500  flex flex-col justify-center w-[70%]">
          <h1 className="text-2xl font-bold text-center my-5">
            Create Account
          </h1>
          <form className="" onSubmit={handleCreateSubmit}>
            <div className="flex flex-col justify-center items-center">
              <FormInput
                label="name"
                name="name"
                type="text"
                value={name}
                setValue={setName}
                placeholder="enter name"
                error={createFormError?.name}
              />
              <FormInput
                label="email"
                name="email"
                type="text"
                value={email}
                setValue={setEmail}
                placeholder="enter email"
                error={createFormError?.email}
              />
              <FormInput
                label="address"
                name="address"
                type="text"
                value={address}
                setValue={setAddress}
                placeholder="enter address"
                error={createFormError?.address}
              />
              <FormPassWordInput
                label="password"
                name="password"
                value={password}
                setValue={setPassword}
                placeholder="enter password"
                error={createFormError?.password}
              />
              <Link
                to={`/login`}
                className="mx-4 self-start font-semibold  text-blue-900 text-sm md:text-base"
              >
                already have account
              </Link>
              <Button
                type="submit"
                classes="w-[70%] text-center  bg-orange-800 hover:bg-orange-600 my-5 py-1.5 px-2 rounded-md font-semibold text-lg"
                disabled={isCreating}
                text="create"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
