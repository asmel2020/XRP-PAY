import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, schema } from "./validate";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useLocation } from "wouter";
import { registerUser } from "../../utils/axios/auth";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
export const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [, setLocation] = useLocation();

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      const { token } = await registerUser({
        email,
        password,
      });
      Cookies.set("token", token);
      setLocation("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_BAD_REQUEST") {
          toast.error("Invalid Credentials");
        }

        if (error.code === "ERR_NETWORK") {
          toast.error("Error Network");
        }

        return;
      } else {
        toast.error("500 service");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <Card placeholder={""} className="w-96">
        <CardHeader
          placeholder={""}
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography placeholder={""} variant="h3" color="white">
            Sign Un
          </Typography>
        </CardHeader>

        <CardBody placeholder={""} className="flex flex-col gap-4">
          <Input
            crossOrigin={""}
            {...register("email")}
            error={!!errors.email}
            label="Email*"
            type="email"
            size="lg"
          />
          <Input
            type="password"
            crossOrigin={""}
            {...register("password")}
            label="Password*"
            error={!!errors.password}
            size="lg"
          />
          <Input
            type="password"
            crossOrigin={""}
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            label="Confirm Password*"
            size="lg"
          />
        </CardBody>
        <CardFooter placeholder={""} className="pt-0">
          
          <Button placeholder={""} variant="gradient" fullWidth type="submit">
            Sign Un
          </Button>
          <Typography
            placeholder={""}
            variant="small"
            className="mt-6 flex justify-center"
          >
            Do you already have an account?
            <Typography
              placeholder={""}
              as="a"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold cursor-pointer"
              onClick={() => setLocation("/login")}
            >
              Sign In
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  );
};
