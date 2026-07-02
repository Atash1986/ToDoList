

import { useTodoListContext } from "../Contexts/TodoListContext";


function Setting() {
  const {language}=  useTodoListContext();
  return (
    <div style={{ padding: "20px" }}>
      <h1> صفحه تنظیمات</h1>
      <select>
        <option>
          {language}
        </option>
      </select>
    </div>
  );
}

export default Setting;
