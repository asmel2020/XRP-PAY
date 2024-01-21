import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Input,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, schema } from "./validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { ethers } from "ethers";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { createPayment } from "../../utils/axios/payment";
import Cookies from "js-cookie";
interface Props {
  open: boolean;
  handleOpen: () => void;
}
export function ModalWithdrawal({ handleOpen, open }: Props) {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [first, setfirst] = useState("");

  const [disable, setDisable] = useState(false);

  const actualizarState = (e: any) => {
    const esValid = e.target.validity.valid;

    let value: string = e.target.value;

    if (esValid) {
      if (first.length === 0 && e.target.value === ".") {
        return;
      }

      let letteCount: any = {};
      for (let index = 0; index < value.length; index++) {
        const element = value[index];
        if (!letteCount[element]) {
          letteCount[element] = 0;
        }
        letteCount[element]++;
      }

      if (letteCount["."] === 2) {
        return;
      }

      if (!letteCount["."]) {
        if (value.length === 6) {
          return;
        }
      }

      if (letteCount["."] === 1) {
        const splite = value.split(".");

        if (splite[1].length === 3) {
          return;
        }

        if (splite[0].length === 6) {
          return;
        }
      }

      setfirst(value);
    }
  };

  const onSubmit = async ({ address, value }: FormData) => {
    setDisable(true);
    try {
      const token = Cookies.get("token");
      await createPayment(
        "/users/withdrawal",
        {
          address,
          value: ethers.parseUnits(value).toString(),
        },
        token
      );
      toast.success("successfully created", {
        duration: 2000,
      });
      setDisable(false);
      reset();
      setfirst("");
      handleOpen();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_BAD_REQUEST") {
          toast.error("Invalid Credentials");
        }

        if (error.code === "ERR_NETWORK") {
          toast.error("Error Network");
        }
        setDisable(false);
        return;
      } else {
        toast.error("500 service");
        setDisable(false);
      }
    }
  };

  return (
    <>
      <Dialog placeholder={""} open={open} handler={handleOpen} size="sm">
        <Toaster />
        <DialogHeader placeholder={""} className="flex justify-between ml-3">
          Withdrawal
          <IconButton placeholder={""} variant="text" onClick={handleOpen}>
            <XMarkIcon className=" h-8 w-8" />
          </IconButton>
        </DialogHeader>
        <DialogBody placeholder={""} className="flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mb-8 w-3/4">
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="-mb-3"
              >
                Address
              </Typography>
              <Input
                maxLength={50}
                crossOrigin={"*"}
                size="lg"
                placeholder="address"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("address")}
                error={!!errors.address}
                disabled={disable}
              />
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="-mb-3"
              >
                Value
              </Typography>
              <Input
                pattern="[0-9.]{0,17}"
                value={first}
                type="text"
                crossOrigin={"*"}
                size="lg"
                placeholder="0"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("value")}
                onChange={actualizarState}
                error={!!errors.value}
                disabled={disable}
              />
            </div>

            <Button
              placeholder={""}
              className="mt-6 flex items-center justify-center gap-3"
              fullWidth
              color="blue"
              type="submit"
              disabled={disable}
            >
              {disable ? <Spinner /> : "Create Pay"}
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
