import { useState } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import {
  BanknotesIcon,
  ClipboardDocumentIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Payment } from "../../utils/axios/user/interface";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { ModalCreatePay } from "../ModalCreatePay";
import { ethers } from "ethers";
import { ModalWithdrawal } from "../ModalWithdrawal";
const TABLE_HEAD = [, "Value", "Status", "Concepto", "Created At", "Link"];
const colorStatus: any = {
  ACTIVATED: "blue",
  COMPLETE: "green",
  CANCELLED: "blue-gray",
};

interface Props {
  payment: Payment[];
}

export function Table({ payment }: Props) {
  const handelCopy = () => {
    toast.success("Successfully Copy Link");
  };
  const [openCreatePay, setOpenCreatePay] = useState(false);
  const handleOpenCreatePay = () => setOpenCreatePay(!openCreatePay);

  const [openWithdrawal, setOpenWithdrawal] = useState(false);
  const handleOpenWithdrawal = () => setOpenWithdrawal(!openWithdrawal);
  return (
    <>
      <ModalCreatePay handleOpen={handleOpenCreatePay} open={openCreatePay} />
      <ModalWithdrawal handleOpen={handleOpenWithdrawal} open={openWithdrawal} />
      <Card placeholder={""} className="mt-14 h-full w-full ">
        <CardHeader
          placeholder={""}
          floated={false}
          shadow={false}
          className="rounded-none"
        >
          <div className="flex items-center justify-end gap-8">
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                placeholder={""}
                className="flex items-center gap-3"
                size="sm"
                color="blue"
                onClick={handleOpenWithdrawal}
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Withdrawal
              </Button>

              <Button
                placeholder={""}
                className="flex items-center gap-3"
                size="sm"
                color="blue"
                onClick={handleOpenCreatePay}
              >
                <BanknotesIcon strokeWidth={2} className="h-4 w-4" /> Create Pay
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody placeholder={""} className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payment.map(
                ({ value, concepto, status, id, createdAt }, index) => {
                  const isLast = index === payment.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={value}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              placeholder={""}
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {ethers.formatEther(value).toString()}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={status}
                            color={colorStatus[status]}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            placeholder={""}
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {concepto}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(createdAt).toLocaleDateString("en-us", {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Copy Link">
                          <CopyToClipboard
                            text={`${
                              import.meta.env.VITE_URL_APP
                            }/payment/${id}`}
                            onCopy={handelCopy}
                          >
                            <IconButton placeholder={""} variant="text">
                              <ClipboardDocumentIcon className="h-4 w-4" />
                            </IconButton>
                          </CopyToClipboard>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter
          placeholder={""}
          className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        >
          <Typography
            placeholder={""}
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button placeholder={""} variant="outlined" size="sm">
              Previous
            </Button>
            <Button placeholder={""} variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
