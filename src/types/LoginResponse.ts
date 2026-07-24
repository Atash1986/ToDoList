import { User } from "./User";

export type  LoginResponse = {
   data:{
    token: string,
  tokenType: "Bearer",
  expiresInSeconds: number,
  user:User | null,
   }
    message:string,
};
