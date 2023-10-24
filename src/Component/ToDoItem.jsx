import React, { useState } from "react";
import "./ToDoItem.css";

function ToDoItem(props) {
  // function ToDoItem({ id, item, onChecked }) {
  // const [isDone, setIsDone] = useState("false");

  // const { title, author, dataAndTime } = item;
  //console.log("author in TodoItem=", props.author);
  return (
    <li
      id={props.id}
      style={{ textDecoration: props.isDone ? "line-through" : "none" }}
    >
      <input
        type="checkbox"
        onClick={() => props.onChecked(props.id)}
        // id={props.index}
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/1950/1950715.png"
        alt=""
      />

      <span class="titr">Title </span>
      <span>{props.title}</span>

      <span class="titr">Author </span>
      <span>{props.author} </span>

      <span class="titr">Date And Time</span>
      <span>{props.dateAndTime}</span>

      {/* <span name="status" value="false" /> */}

      <span class="titr" name="description"></span>
      <span></span>
    </li>
  );
}
export default ToDoItem;
