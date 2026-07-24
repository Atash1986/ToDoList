import { createContext, useContext } from "react";
import { TokenContextType } from "../types/TokenContextType";

export const TokenContext = createContext<TokenContextType|null>(null);
export function useTokenContext() {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("TokenContext must be used within a TokenContext.Provider");
  }
  return context;
}