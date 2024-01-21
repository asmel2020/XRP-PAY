import * as yup from "yup";

export const schema = yup.object({
    value: yup.string().required(),
    concept: yup.string().required(),
}).required();

export type FormData = yup.InferType<typeof schema>;