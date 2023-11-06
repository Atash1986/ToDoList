import React from "react";

import "./CategoryItem.css";
function CategoryItem ({id,color,title,isActive,onClick}){

  
  
    return(
       <li   onClick={onClick} key={id} className="categoryItem">

   <div 
    className={"inner-div" + (isActive===true ?" active-div":"")} 
    id={id} 
    onClick={onClick}  
     >

   
      <div
      className="bubble"
        style={{
        backgroundColor:color
               }}
      />

      <div className="categoryItemTitle">
        {title}
      </div>
      </div>
      </li>

    )

}
export default CategoryItem;