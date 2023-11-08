import React from "react";
import logoDefaultImg from "../LDI.png";
import profileLogo from "../profile.png";
import settingLogo from "../OIP.jpg";
import CategoryItem from "./CategoryItem";
import "./Sidbar.css";
import PropTypes from 'prop-types';
import ToDoList from "./ToDoList";





function Sidbar({ appTitle = 'Ati project', logo = logoDefaultImg, categories,activeCategoryId,setCategoryId}) {
 
   
 function handelClick(event, selectedId)
  {
    // const selectedId=Number(event.target.id);
    setCategoryId(selectedId); 

    <ToDoList activeCategoryId={activeCategoryId} />
  
   
    }
  
  return (
    <div className="sidbar">
      <header>
      <h1 className="title" >{appTitle}</h1>
      <img className="logo" src={logo} />
      </header>
      <div className="menu" >
      <h1>To Do </h1>
      
      <ul > 
      <CategoryItem 
        id={0}
        color= 'rgba(0,0,0,0)'
       title='All Tasks'
       isActive={activeCategoryId===0 ?true :false}
       onClick={(event)=> handelClick(event,0)}
       />
      {categories.map((categoryItem) => {
       
       return(
        <CategoryItem 
        className="CategoryItem"
        key={categoryItem.id}
        id={categoryItem.id}
        color= {categoryItem.color}
        title={categoryItem.title} 
        isActive={categoryItem.id ===activeCategoryId ?true :false}
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
  Sidbar.propTypes = {
   appTitle: PropTypes.string, // Define the prop type and whether it's required
   logo: PropTypes.img, // Define the prop type and whether it's required
      activeCategoryId: PropTypes.number, // Define the prop type and whether it's required
      setCategoryId: PropTypes.func,
      categories: PropTypes.object, // Define the prop type and whether it's required
  };
export default Sidbar;
