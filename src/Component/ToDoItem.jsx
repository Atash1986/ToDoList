import React from "react";
import "./ToDoItem.css";
import PropTypes from 'prop-types';

function ToDoItem({id,  title,  isDone,  categoryId,  dateAndTime,  onChecked,  author}) {
  const  categoryColors = {
    1: 'red',
    2: 'blue',
    3: 'green',
     } 
  console.log("category in TodoItem=", categoryId);
  return (
    <li 
    className="taskItem"
      id={id}
      style={{ textDecoration: isDone ? "line-through" : "none" }}
    >
     
      {/* <img
        src="https://cdn-icons-png.flaticon.com/512/1950/1950715.png"
        alt=""
      /> */}


     <di className="category" style={{backgroundColor:categoryColors[categoryId]}}></di>
      <span >{title}</span>

      
      <span>{author} </span>

      
      <span>{dateAndTime}</span>

      {/* <span name="status" value="false" /> */}

      {/* <span className="titr" name="description"></span> */}
      {/* <span className="titr">Category</span> */}
      {/* <span >{ categoryId}</span> */}
      <input
        type="checkbox"
        onClick={() => onChecked(id)}
        
      />
    </li>
    
  );
}
ToDoItem.propTypes = {
  id: PropTypes.number, // Define the prop type and whether it's required
  title: PropTypes.string, // Define the prop type and whether it's required
 isDone: PropTypes.bool, // Define the prop type and whether it's required

 categoryId: PropTypes.number, // Define the prop type and whether it's required
 dateAndTime: PropTypes.string, // Define the prop type and whether it's required
 onChecked: PropTypes.func,
 author: PropTypes.string, // Define the prop type and whether it's required
};
export default ToDoItem;
