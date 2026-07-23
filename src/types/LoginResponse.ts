import { User } from "./User";

export type  LoginResponse = {
   data:User | null,
    message:string,
};
