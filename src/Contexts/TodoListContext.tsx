import { createContext, useContext } from "react";
import { LanguageEnum } from "../data/language";

export const TodoListContext = createContext({
  language: LanguageEnum.ENGLISH,
} as any);

export function useTodoListContext() {
  return useContext(TodoListContext);
}
