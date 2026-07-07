import { useState } from "react";
import { toast } from "react-toastify";
import { useTodoListContext } from "../Contexts/TodoListContext";
import "./Setting.scss";
import { LanguageEnum } from "../data/language";

function Setting() {
  const { language } = useTodoListContext();
  const [tempSelectedLanguage, setTempSelectedLanguage] = useState(language);

  const LANGUAGES = [
    { value: LanguageEnum.ENGLISH, label: "English" },
    { value: LanguageEnum.PERSIAN, label: "فارسی" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Settings</h1>
      <div className="LanguageBox">
        <label htmlFor="langSelect">Language</label>
        <select
          id="LangSelect"
          value={tempSelectedLanguage}
          onChange={(e) => setTempSelectedLanguage(e.target.value)}
        >
          {LANGUAGES.map((lang) => (
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
            // setLanguage(tempSelectedLanguage);
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
