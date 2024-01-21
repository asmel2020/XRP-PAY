import { ethers } from "ethers";
import * as yup from "yup";

export const schema = yup
  .object({
    value: yup.string().required(),
    address: yup.mixed().test({
      test: (value: any, context) => {
        console.log(value)
        if (!ethers.isAddress(value)) {
          return context.createError({
            message: `address error`,
            path: "address",
          });
        }

        return true;
      },
    }),
  })
  .required();

export type FormData = yup.InferType<typeof schema>;
