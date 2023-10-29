import React,{useState,useEffect} from "react";
import logoDefaultImg from "../LDI.png";
import profileLogo from "../profile.png";
import settingLogo from "../OIP.jpg";
import CategoryItem from "./CategoryItem";
import "./Sidbar.css";



function Sidbar({ appTitle = 'Ati project', logo = logoDefaultImg, categories }) {
  
  const [activCategoryId,setCategoryId] = useState(0);
  console.log({activCategoryId})

  function handelClick(event, selectedId)
  {
    // const selectedId=Number(event.target.id);
    setCategoryId(selectedId); 
  
     
   
  
  
   
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
       isActive={activCategoryId===0 ?true :false}
       onClick={(event)=> handelClick(event,0)}
       />
      {categories.map((categoryItem) => {
       console.log(categoryItem.id);
       return(
        <CategoryItem 
        id={categoryItem.id}
        color= {categoryItem.color}
       title={categoryItem.title} 
       isActive={categoryItem.id ===activCategoryId ?true :false}
       onClick={(event) => handelClick(event, categoryItem.id)}
       />)
        
})}
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
