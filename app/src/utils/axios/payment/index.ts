import axiosConfig from "../configAxios";

export const payment = async ([url, token]: any) => {
  return (
    await axiosConfig.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const createPayment = async (url: any, data: any, token: any) => {
  return (
    await axiosConfig.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
