import React,{useState} from "react";
import logoDefaultImg from "../LDI.png";
import profileLogo from "../profile.png";
import settingLogo from "../OIP.jpg";
import CategoryItem from "./CategoryItem";
import "./Sidbar.css";



function Sidbar({ appTitle = 'Ati project', logo = logoDefaultImg, categories }) {
  
  const [activCategoryId,setCategoryId] = useState();

  function handelClick(event)
  {
     alert(event.id);
  }
  // const logoDefault = logoDefaultImg;
  // const logo = logoDynamic ? logoDynamic : logoDefault;
  return (
    <div className="sidbar">
      <header>
      <h1 className="title" text="To Do List">{appTitle}</h1>
      <img className="logo" src={logo} />
      </header>
      <div className="menu" >
      <h1>To Do </h1>
      
      <ul > 
      <CategoryItem 
        id={0}
        color= 'rgba(0,0,0,0)'
       title='All Tasks'
       isActive="true"
       onClick={handelClick}
       />
      {categories.map((categoryItem) => (
        <CategoryItem 
        id={categoryItem.id}
        color= {categoryItem.color}
       title={categoryItem.title} 
       isActive="true"
       onClick={handelClick}
       />
        
      ))}
 </ul> 

    </div>
    <footer>
    <img className="profileLogo" src={profileLogo}/>
      <img className="settingLogo" src={settingLogo}/>
      </footer>
    </div>
  );
}
export default Sidbar;
