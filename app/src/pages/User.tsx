import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
import { NavbarC } from "../components/Navbar";
import Cookies from "js-cookie";
import { Redirect, useLocation } from "wouter";
import useSWR from "swr";
import { user } from "../utils/axios/user";
import { userRespon } from "../utils/axios/user/interface";
import { ethers } from "ethers";
import { Table } from "../components/Table";

export const User = () => {
  if (!Cookies.get("token")) return <Redirect to={"/login"} />;

  const [, setLocation] = useLocation();

  const { data, error } = useSWR<userRespon>(
    ["/users", Cookies.get("token")],
    user,
    {
      refreshInterval: 10000,
      onSuccess() {
       
      },
      onError() {

        Cookies.remove("token");
        setLocation("/login");
      },
    }
  );

  if (error) return <div>error server...</div>;
  if (!data) return <div></div>;
  
  return (
    <div className="w-full">
      <NavbarC />
      <div className="flex-col w-4/5 bg-red m-auto">
        <div className="space-y-10 sm:flex sm:justify-center sm:mt-12 gap-5">
          <Toaster />
          {/* Balance */}
          <Card placeholder={""} className="sm:w-96 sm:h-36">
            <CardBody placeholder={""}>
              <Typography
                placeholder={""}
                variant="h5"
                color="blue-gray"
                className="mb-2"
              >
                Balance
              </Typography>
              <Typography placeholder={""} className="break-all"  variant="h3">
                {ethers.formatEther(data.amount)}
              </Typography>
            </CardBody>
          </Card>

          {/* Cantidad De Pagos Creados */}
          <Card placeholder={""} className="sm:w-96 sm:h-36">
            <CardBody placeholder={""}>
              <Typography
                placeholder={""}
                variant="h4"
                color="blue-gray"
                className="mb-2"
              >
                Payments Created
              </Typography>
              <Typography placeholder={""} className="break-all" variant="h3">
                {data.paymentsCount.cancelledCount+data.paymentsCount.activatedCount+data.paymentsCount.completaCount}
              </Typography>
            </CardBody>
          </Card>

          {/* Cantidad De Pagos Creados */}
          <Card placeholder={""} className=" sm:w-96 sm:h-36">
            <CardBody placeholder={""}>
              <Typography
                placeholder={""}
                variant="h5"
                color="blue-gray"
                className="mb-2"
              >
                Payments Cancelled
              </Typography>
              <Typography placeholder={""} className="break-all"  variant="h3">
                {data.paymentsCount.cancelledCount}
              </Typography>
            </CardBody>
          </Card>

           {/* Cantidad De Pagos Creados */}
           <Card placeholder={""} className=" sm:w-96 sm:h-36">
            <CardBody placeholder={""}>
              <Typography
                placeholder={""}
                variant="h5"
                color="blue-gray"
                className="mb-2"
              >
                Payments Completa
              </Typography>
              <Typography placeholder={""} className="break-all"  variant="h3">
                {data.paymentsCount.completaCount}
              </Typography>
            </CardBody>
          </Card>
        </div>
        <Table payment={data.payments} />
      </div>
    </div>
  );
};
