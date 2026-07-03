import { createContext, useContext } from "react";

export const TodoListContext = createContext({
  language: "english",
  setLanguage: () => {},
} as any);

export function useTodoListContext() {
  return useContext(TodoListContext);
}
