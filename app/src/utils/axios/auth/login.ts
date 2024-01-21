import axiosConfig from "../configAxios"

interface LoginUserParms {
    email:string,
    password:string
}

interface LoginUserResponse {
    token:string
    
}
export const login =async (data:LoginUserParms):Promise<LoginUserResponse>=>{
  return (await axiosConfig.post<LoginUserResponse,any,LoginUserParms>("/auth/login",data)).data
}
