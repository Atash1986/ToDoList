import React, { useState } from "react";
import "./ToDoItem.css";

function ToDoItem({id,  title,  isDone,  categoryId,  dateAndTime,  onChecked,  author}) {
  // function ToDoItem({ id, item, onChecked }) {
  // const [isDone, setIsDone] = useState("false");

  // const { title, author, dataAndTime } = item;
  console.log("category in TodoItem=", categoryId);
  return (
    <li
      id={id}
      style={{ textDecoration: isDone ? "line-through" : "none" }}
    >
      <input
        type="checkbox"
        onClick={() => props.onChecked(id)}
        // id={props.index}
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/1950/1950715.png"
        alt=""
      />

      <span class="titr">Title </span>
      <span>{title}</span>

      <span class="titr">Author </span>
      <span>{author} </span>

      <span class="titr">Date And Time</span>
      <span>{dateAndTime}</span>

      {/* <span name="status" value="false" /> */}

      <span class="titr" name="description"></span>
      <span class="titr">Category</span>
      <span >{ categoryId}</span>
    </li>
  );
}
export default ToDoItem;
