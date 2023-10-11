import React from "../";
import logoDefaultImg from "../LDI.png";

function Sidbar({ appTitleDynamic, logoDynamic, categories }) {
  const appTitleDefault = "Ati project";
  const appTitle = appTitleDynamic ? appTitleDynamic : appTitleDefault;
  const logoDefault = logoDefaultImg;
  const logo = logoDynamic ? logoDynamic : logoDefault;
  return (
    <div className="menu">
      <h1 text="To Do List">{appTitle}</h1>
      <img src={logo} />

      <h1>To Do </h1>
      <div>
        <span>All Task</span>
      </div>
      {categories.map((categoryItem) => (
        <li>
          <div
            style={{
              backgroundColor: categoryItem.color,
              borderRadius: "50%"
            }}
          />

          {console.log(categoryItem.color)}
          <div id={categoryItem.id}>
            <span>{categoryItem.title}</span>
          </div>
        </li>
      ))}
      <h1>The Work Done </h1>
      <div>
        <span>All Task</span>
      </div>

      {categories.map((categoryItem) => (
        <div id={categoryItem.id}>
          <span>{categoryItem.title}</span>
        </div>
      ))}
    </div>
  );
}
export default Sidbar;
