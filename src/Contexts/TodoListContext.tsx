import {createContext,useContext} from "react";

export const TodoListContext=createContext({
    language:"en",
})
export function useTodoListContext() {
    return useContext(TodoListContext);
  }