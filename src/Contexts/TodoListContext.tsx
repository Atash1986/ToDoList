import { createContext, useContext } from "react";
import { TokenContextType } from "../types/TokenContextType";
import { UserContextType } from "../types/UserContextType";

export const TodoListContext = createContext({
  language: "english",
  setLanguage: () => {},
} as any);

export function useTodoListContext() {
  return useContext(TodoListContext);
}
export const TokenContext = createContext<TokenContextType | null>(null);
export function useTokenContext() {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("TokenContext must be used within a TokenContext.Provider");
  }
  return context;
}
export const UserContext = createContext<UserContextType | null>(null);
export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used inside UserContext.Provider");
  }

  return context;
}
