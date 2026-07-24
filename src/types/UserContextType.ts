import { Dispatch, SetStateAction } from "react";
import { User } from "./User";

export type UserContextType={
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  };