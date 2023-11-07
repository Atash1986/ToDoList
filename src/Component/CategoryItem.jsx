import React from "react";
import PropTypes from 'prop-types';

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
CategoryItem.propTypes = {
  id: PropTypes.number.isRequired, // Define the prop type and whether it's required
  title: PropTypes.string.isRequired, // Define the prop type and whether it's required
 isActive: PropTypes.bool.isRequired, // Define the prop type and whether it's required
 categoryId: PropTypes.number.isRequired, // Define the prop type and whether it's required
 color: PropTypes.string.isRequired, // Define the prop type and whether it's required
 onClick: PropTypes.func.isRequired,
 
};
export default CategoryItem;