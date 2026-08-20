import { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useTodoListContext } from "../../../Contexts/TodoListContext";
import "../Setting/Setting.scss";

function Setting() {
  const { languageState, dispatch } =
    useTodoListContext();
  const languages = [
    { value: "en", label: "English" },
    { value: "fa", label: "فارسی" },
  ];
  function handleLanguageChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    dispatch({
      type: "SET_LANGUAGE",
      payload: event.target.value as
        | "en"
        | "de"
        | "fa",
    });
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1>Settings</h1>
      <div className="LanguageBox">
        <label htmlFor="langSelect">Language</label>
        <select
          id="LangSelect"
          value={languageState.language}
          onChange={handleLanguageChange}
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <div className="saveBtnContainer" style={{}}>
        <button
          className="saveBtn"
          onClick={() => {

            toast.success("Settings saved successfully!");
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Setting;
