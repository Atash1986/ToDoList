import { Dispatch, SetStateAction } from "react";

export type TokenContextType={
    token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};