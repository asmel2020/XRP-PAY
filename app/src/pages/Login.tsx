
import Cookies from "js-cookie";
import { FormLogin } from "../components";
import { Redirect } from "wouter";

export const Login = () => {

  if (!!Cookies.get("token")) return <Redirect to={"/"} />;

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <FormLogin />
    </div>
  );
};
