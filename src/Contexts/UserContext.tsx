import {createContext, useContext} from "react";
import { UserContextType } from "../types/UserContextType";

export const UserContext = createContext<UserContextType | null>(null);
export function useUserContext()
{
   const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used inside UserContext.Provider");
  }

  return context;
}

