import { useState } from "react";
import { toast } from "react-toastify";
import { useTodoListContext } from "../Contexts/TodoListContext";
import "./Setting.css";

function Setting() {
  const { language, setLanguage } = useTodoListContext();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const languages = [
    { value: "en", label: "English" },
    { value: "fa", label: "فارسی" },
  ];
 
  return (
    <div style={{ padding: "20px" }}>
      <h1>Settings</h1>
      <div className="LanguageBox">
        <label htmlFor="langSelect">Language</label>
        <select
          id="LangSelect"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
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
            setLanguage(selectedLanguage);
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
