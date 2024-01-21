import axiosConfig from "../configAxios";

export const user = async ([url, token]:any) => {
  return (
    await axiosConfig.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
  ).data;
};
