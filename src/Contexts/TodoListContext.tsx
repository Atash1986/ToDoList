import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { User } from "../types/User";

export type Language = "en" | "de" | "fa";

export type LanguageState = {
  language: Language;
};
export type LanguageAction = {
  type: "SET_LANGUAGE";
  payload: Language;
};
type TodoListContextType = {
  languageState: LanguageState;
  dispatch: Dispatch<LanguageAction>;

  token: string | null;
  setToken: React.Dispatch<SetStateAction<string | null>>;

  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
};

export const TodoListContext = createContext<TodoListContextType | undefined>(undefined);



export function useTodoListContext() {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error("TodoListContext must be used within a TodoListContext.Provider");
  }
  return context;
}

