import { createContext, SetStateAction, useContext } from "react";
import { TokenContextType } from "../types/TokenContextType";
import { UserContextType } from "../types/UserContextType";
import { User } from "../types/User";

export const TodoListContext = createContext({
  language: "english",
  setLanguage: () => { },
  token: null as string | null,
  setToken: (value: SetStateAction<string | null>) => { },
  user: null as User | null,
  setUser: (value: SetStateAction<User | null>) => { },
} as any);

export function useTodoListContext() {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error("TodoListContext must be used within a TodoListContext.Provider");
  }
  return context;
}

