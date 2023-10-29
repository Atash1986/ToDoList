import React from "react";

import "./CategoryItem.css";
function CategoryItem ({id,color,title,isActive,onClick}){
console.log({isActive});
    return(
       <li key={id} className="categoryItem">

   <div className= "activDiv" id={id} onClick={onClick}  style={{
      backgroundColor: (isActive===true ? 'white' : "transparent"),
      color: (isActive===true?"#6B3CD4":"whitesmoke"),
    }} >

   
      <div
      className="bubble"
        style={{
        //    display: "inline-block",
        // width:"15px",
        // height:"15px",
        // borderRadius: "50%", 
        // marginRight:"10px" ,
        backgroundColor:color}}
      />

      <div id={id} onClick={onClick}>
        {title}
      </div>
      </div>
      </li>

    )

}
export default CategoryItem;