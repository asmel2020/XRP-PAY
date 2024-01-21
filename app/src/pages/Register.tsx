
import Cookies from "js-cookie";

import { Redirect } from "wouter";
import { FormRegister } from "../components/FormRegister";

export const Register = () => {

  if (!!Cookies.get("token")) return <Redirect to={"/"} />;

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <FormRegister />
    </div>
  );
};
