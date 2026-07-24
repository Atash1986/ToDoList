import { User } from "./User";

export type  LoginResponse = {
   data:{
    token: string| null,
    tokenType: "Bearer" | null,
    expiresInSeconds: number | null,
  user:User | null,
   }
    message:string,
};
