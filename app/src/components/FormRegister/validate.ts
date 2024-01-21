import * as yup from "yup";

export const schema = yup
  .object({
    email: yup.string().email("Invalid format").required("required field"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("required field")
      .matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number or special character"
      ),
    confirmPassword: yup
      .string()
      .required("required field")
      .oneOf([yup.ref("password"), "null"], "Password does not match"),
  })
  .required();

export type FormData = yup.InferType<typeof schema>;