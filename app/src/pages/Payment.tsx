import { Card, CardBody, Typography } from "@material-tailwind/react";
import QRCode from "react-qr-code";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "../components/Icons";
import toast, { Toaster } from "react-hot-toast";

import { useLocation, useParams } from "wouter";
import useSWR from "swr";

import { PaymentRespon } from "../utils/axios/payment/interface";
import { payment } from "../utils/axios/payment";
import { ethers } from "ethers";

export const Payment = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data, error } = useSWR<PaymentRespon>([`/payment/${id}`], payment, {
    refreshInterval: 10000,
    onSuccess() {},
    onError() {
      setLocation("/login");
    },
  });

  if (error) return <div>error server...</div>;
  if (!data) return <div></div>;

  const handelCopy = () => {
    toast.success("Successfully Copy");
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <Toaster />
        {data.status === "ACTIVATED" ? (
          <Card placeholder={""} className=" w-96">
            <div className="m-8">
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={data.address}
                viewBox={`0 0 256 256`}
              />
            </div>
            <CardBody placeholder={""}>
              <Typography
                placeholder={""}
                variant="h5"
                color="blue-gray"
                className="my-2"
              >
                Netword
              </Typography>
              <Typography placeholder={""} className="break-all">
                XRP SIDE-EVM
              </Typography>

              {/* value */}
              <Typography
                placeholder={""}
                variant="h5"
                color="blue-gray"
                className="my-2 flex gap-3"
              >
                Value
                <CopyToClipboard
                  text={ethers.formatEther(data.value).toString()}
                  onCopy={handelCopy}
                >
                  <button>
                    <Copy />
                  </button>
                </CopyToClipboard>{" "}
              </Typography>
              <Typography placeholder={""} className="break-all">
                {ethers.formatEther(data.value).toString()}
              </Typography>
              {/*  address */}
              <Typography
                placeholder={""}
                variant="h5"
                color="blue-gray"
                className="my-2 flex gap-3"
              >
                Deposit Address
                <CopyToClipboard text={data.address} onCopy={handelCopy}>
                  <button>
                    <Copy />
                  </button>
                </CopyToClipboard>{" "}
              </Typography>
              <Typography placeholder={""} className="break-all">
                {data.address}
              </Typography>
            </CardBody>
          </Card>
        ) : (
          <Card placeholder={""} className="w-96">
            <div className=" flex justify-center">
              {data.status === "COMPLETE" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#4caf50"
                    d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                  ></path>
                  <path
                    fill="#ccff90"
                    d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#f44336"
                    d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                  ></path>
                  <line
                    x1="16.9"
                    x2="31.1"
                    y1="16.9"
                    y2="31.1"
                    fill="none"
                    stroke="#fff"
                    stroke-miterlimit="10"
                    stroke-width="4"
                  ></line>
                  <line
                    x1="31.1"
                    x2="16.9"
                    y1="16.9"
                    y2="31.1"
                    fill="none"
                    stroke="#fff"
                    stroke-miterlimit="10"
                    stroke-width="4"
                  ></line>
                </svg>
              )}
            </div>
            <CardBody placeholder={""} className="flex justify-center">
              <Typography
                placeholder={""}
                variant="h5"
                color="blue-gray"
                className="my-2"
              >
                {data.status === "COMPLETE"
                  ? "Transaction Completed"
                  : "Transaction Completed"}
              </Typography>
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
};
