import axiosConfig from "../configAxios"

interface  RegisterUserParms {
    email:string,
    password:string
}

interface RegisterUserResponse {
    token:string
    
}
export const registerUser =async (data:RegisterUserParms):Promise<RegisterUserResponse>=>{
   
  return (await axiosConfig.post<RegisterUserResponse,any,RegisterUserParms>("/auth/register",data)).data
}
